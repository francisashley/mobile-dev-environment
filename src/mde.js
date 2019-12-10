import { defaults, isArray } from "lodash";

import TaskBar from "./features/task-bar/task-bar";
import Tray from "./features/tray/tray";
import crel from "crel";
import stately from "./utils/state";
import tracer from "./utils/tracer.js";

(function() {
  "use strict";

  function MobileDevEnvironment(options = {}) {
    //#region
    /**
     * Set defaults
     */
    defaults(options, {
      group: "global",
      modules: ["reload", "tray"],
      controlbarOrder: ["reload", "logtray"],
      hardReload: true,
      controlbarPosition: "tsr",
      displayErrors: true,
      useConsoleLog: false
    });

    /**
     * Rename property names.
     * Roll this out to user in future breaking commit.
     */
    if (isArray(options.modules))
      options.modules = options.modules.map(m => (m === "logtray" ? "tray" : m));
    if (isArray(options.controlbarOrder))
      options.controlbarOrder = options.controlbarOrder.map(m => (m === "logtray" ? "tray" : m));
    options.features = options.controlbarOrder.filter(module => options.modules.includes(module));
    options = {
      stateId: options.group,
      features: options.features,
      "features.reload.refreshCache": options.hardReload,
      "features.actions.corner": options.controlbarPosition,
      "features.tray.showErrors": options.displayErrors,
      "features.tray.useConsoleLog": options.useConsoleLog
    };
    //#endregion

    /**
     * STATE
     */

    const state = stately(options.stateId);
    state.set("features", options.features);
    state.set("task-bar.corner", options["features.actions.corner"]);
    state.set("reload.refreshCache", options["features.reload.refreshCache"]);
    state.set("tray.showErrors", options["features.tray.showErrors"]);
    state.set("tray.useConsoleLog", options["features.tray.useConsoleLog"]);
    state.setCache("tray.open", state.get("tray.open") !== false);
    state.setCache(
      "tray.height",
      limitTrayHeight(state.getCache("tray.height", window.innerHeight * 0.25))
    );
    state.set("log", []);

    /**
     * ACTIONS
     */

    function toggleTray() {
      state.setCache("tray.open", !state.getCache("tray.open"));
      render();
    }

    function onResizeTray(height) {
      height = limitTrayHeight(height);

      if (height !== state.getCache("tray.height")) {
        state.setCache("tray.height", height);
        render();
      }
    }

    function onAddLog({ message, filePath, fileName, lineNumber, type } = {}) {
      state.set("log", [...state.get("log"), { message, filePath, fileName, lineNumber, type }]);
      render();
    }

    // Utils
    function limitTrayHeight(height) {
      // set min height to match resize button height
      const min = 11;

      // Set max height based on whether task bar is displayed
      const max = state.get("features").length > 0 ? window.innerHeight - 45 : window.innerHeight;

      // Ensure height is within range, if not get closest value
      return Math.min(Math.max(height, min), max);
    }

    // In the event the window is resized
    window.addEventListener("resize", () => {
      onResizeTray(state.getCache("tray.height"));
    });

    // Display logs
    if (state.get("tray.useConsoleLog")) {
      window.console.log = message => {
        const { filePath, fileName, lineNumber } = tracer(new Error());
        onAddLog({ message, filePath, fileName, lineNumber });
      };
    } else {
      window.log = message => {
        const { filePath, fileName, lineNumber } = tracer(new Error());
        onAddLog({ message, filePath, fileName, lineNumber });
      };
    }

    // Display error messages
    if (state.get("tray.showErrors") === true) {
      window.onerror = (message, filePath, lineNumber) => {
        onAddLog({ message, filePath, fileName: "", lineNumber, type: "error" });
      };
    }

    // render

    function render() {
      const root = document.getElementById("mde");
      root.innerHTML = "";

      // render task bar
      crel(root, TaskBar({ state, onToggleTray: toggleTray }));

      // render tray
      if (state.get("features").includes("tray")) {
        crel(root, Tray({ state, onResizeTray }));
      }
    }
    render();
  }

  // Enable usage in the browser
  window.MobileDevEnvironment = MobileDevEnvironment;

  // Enable usage in Node
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = MobileDevEnvironment;
  }
})();
