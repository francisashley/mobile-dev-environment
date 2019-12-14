import { defaults, isArray } from "lodash";

import TaskBar from "./features/task-bar/task-bar";
import Tray from "./features/tray/tray";
import crel from "crel";
import stately from "./utils/state";
import tracer from "./utils/tracer.js";

(function() {
  "use strict";

  function mobileDevEnvironment(options = {}) {
    //#region
    /**
     * Set defaults
     */
    defaults(options, {
      stateId: "global",
      modules: ["reload", "tray"],
      controlBarOrder: ["reload", "logtray"],
      hardReload: true,
      controlBarPosition: "tr"
    });

    /**
     * Rename property names.
     * Roll this out to user in future breaking commit.
     */
    if (isArray(options.modules))
      options.modules = options.modules.map(m => (m === "logtray" ? "tray" : m));
    if (isArray(options.controlBarOrder))
      options.controlBarOrder = options.controlBarOrder.map(m => (m === "logtray" ? "tray" : m));
    options.features = options.controlBarOrder.filter(module => options.modules.includes(module));
    options = {
      "features.reload.refreshCache": options.hardReload,
      "features.actions.corner": options.controlBarPosition,
      ...options
    };
    //#endregion

    /**
     * STATE
     */

    const state = stately(options.stateId);
    state.set("features", options.features);
    state.set("task-bar.corner", options["features.actions.corner"]);
    state.set("reload.refreshCache", options["features.reload.refreshCache"]);
    state.setCache("tray.open", state.getCache("tray.open", true));
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

    function onResizeTray(offset) {
      const height = limitTrayHeight(state.getCache("tray.height") + offset);

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
    const log = console.log;
    console.log = message => {
      log(message);
      const { filePath, fileName, lineNumber } = tracer(new Error());
      onAddLog({ message, filePath, fileName, lineNumber });
    };

    // Display error messages
    window.onerror = (message, filePath, lineNumber) => {
      onAddLog({ message, filePath, fileName: "", lineNumber, type: "error" });
    };

    // render

    function render() {
      const root = document.getElementById("mde");
      root.innerHTML = "";

      // render task bar
      crel(
        root,
        TaskBar({
          corner: state.get("task-bar.corner"),
          showReload: state.get("features").includes("reload"),
          showTray: state.get("features").includes("tray"),
          shouldRefreshCache: state.get("reload.refreshCache"),
          trayIsOpen: state.getCache("tray.open"),
          onToggleTray: toggleTray
        })
      );

      // render tray
      if (state.get("features").includes("tray")) {
        crel(
          root,
          Tray({
            state,
            trayIsOpen: state.getCache("tray.open"),
            trayHeight: state.getCache("tray.height"),
            log: state.get("log"),
            onResizeTray
          })
        );
      }
    }
    render();
  }

  // Enable usage in the browser
  window.mobileDevEnvironment = mobileDevEnvironment;

  // Enable usage in Node
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = mobileDevEnvironment;
  }
})();
