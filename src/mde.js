import ActionBar from "./features/action-bar/action-bar";
import Tray from "./features/tray/tray";
import crel from "crel";
import { defaults } from "lodash";
import stately from "./utils/state";
import tracer from "./utils/tracer.js";

(function() {
  "use strict";

  function mobileDevEnvironment(options = {}) {
    /**
     * STATE
     */

    defaults(options, {
      stateId: "global",
      actions: ["reload", "toggle-tray"],
      hardReload: true,
      actionsCorner: "tr"
    });

    const state = stately(options.stateId);
    state.set("action-bar", options.actions);
    state.set("action-bar.corner", options.actionsCorner);
    state.set("reload.refreshCache", options.hardReload);
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
      const log = state.get("log");
      const lastEntry = log[log.length - 1];

      if (lastEntry && lastEntry.message === message) {
        log[log.length - 1] = { ...lastEntry, amount: lastEntry.amount + 1 };
      } else {
        log.push({ message, filePath, fileName, lineNumber, type, amount: 1 });
      }
      state.set("log", log);
      render();
    }

    // Utils
    function limitTrayHeight(height) {
      // set min height to match resize button height
      const min = 11;

      // Set max height based on whether task bar is displayed
      const max = state.get("action-bar").length > 0 ? window.innerHeight - 45 : window.innerHeight;

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
    const error = console.error;
    console.error = message => {
      error(message);
      const { filePath, fileName, lineNumber } = tracer(new Error());
      onAddLog({ message, filePath, fileName, lineNumber, type: "error" });
    };
    const assert = console.assert;
    console.assert = (assertion, message) => {
      assert(assertion, message);

      if (!assertion) {
        message =
          "Assertion failed: " + (typeof message !== "undefined" ? message : "console.assert");
        const { filePath, fileName, lineNumber } = tracer(new Error());
        onAddLog({ message, filePath, fileName, lineNumber, type: "error" });
      }
    };

    // Display error messages
    window.onerror = (message, filePath, lineNumber) => {
      onAddLog({ message, filePath, fileName: "", lineNumber, type: "error" });
    };

    // render

    function render() {
      const root = document.getElementById("mde");
      root.innerHTML = "";

      // render action bar
      crel(
        root,
        ActionBar({
          corner: state.get("action-bar.corner"),
          showReload: state.get("action-bar").includes("reload"),
          showTray: state.get("action-bar").includes("toggle-tray"),
          shouldRefreshCache: state.get("reload.refreshCache"),
          trayIsOpen: state.getCache("tray.open"),
          onToggleTray: toggleTray
        })
      );

      // render tray
      if (state.get("action-bar").includes("toggle-tray")) {
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
