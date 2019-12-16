import ActionBar from "src/features/action-bar/action-bar";
import Tray from "src/features/tray/tray";
import crel from "crel";
import limitTrayHeight from "src/utils/limit-tray-height";
import stateHandler from "src/utils/state";
import tracer from "src/utils/tracer.js";

export default function App({ root, stateId, actions, actionsCorner }) {
  const state = stateHandler(stateId);

  // Default tray height
  let trayHeight = state.getCache("tray-height", window.innerHeight * 0.25);
  trayHeight = limitTrayHeight(trayHeight, !!state.get("actions"));

  // SET STATE

  state.set("log", []);
  state.set("actions", actions);
  state.set("actions-corner", actionsCorner);
  state.setCache("tray-open", state.getCache("tray-open", true));
  state.setCache("tray-height", trayHeight);

  /**
   * ACTIONS
   */

  function toggleTray() {
    state.setCache("tray-open", !state.getCache("tray-open"));
    render();
  }

  function resizeTray(offset) {
    const height = limitTrayHeight(state.getCache("tray-height") + offset, !!state.get("actions"));

    if (height !== state.getCache("tray-height")) {
      state.setCache("tray-height", height);
      render();
    }
  }

  function addLogEntry({ message, filePath, fileName, lineNumber, type } = {}) {
    const log = state.get("log");
    const entry = { message, filePath, fileName, lineNumber, type, amount: 1 };
    const lastEntry = log[log.length - 1];

    if (lastEntry && lastEntry.message === message) {
      lastEntry.amount = lastEntry.amount + 1;
      log[log.length - 1] = lastEntry;
    } else {
      log.push(entry);
    }

    state.set("log", log);
    render();
  }

  // In the event the window is resized
  window.addEventListener("resize", () => {
    resizeTray(state.getCache("tray-height"));
  });

  // Display logs
  const log = console.log;
  console.log = message => {
    log(message);
    const { filePath, fileName, lineNumber } = tracer(new Error());
    addLogEntry({ message, filePath, fileName, lineNumber });
  };
  const error = console.error;
  console.error = message => {
    error(message);
    const { filePath, fileName, lineNumber } = tracer(new Error());
    addLogEntry({ message, filePath, fileName, lineNumber, type: "error" });
  };
  const assert = console.assert;
  console.assert = (assertion, message) => {
    assert(assertion, message);

    if (!assertion) {
      message =
        "Assertion failed: " + (typeof message !== "undefined" ? message : "console.assert");
      const { filePath, fileName, lineNumber } = tracer(new Error());
      addLogEntry({ message, filePath, fileName, lineNumber, type: "error" });
    }
  };

  // Display error messages
  window.onerror = (message, filePath, lineNumber) => {
    addLogEntry({ message, filePath, fileName: "", lineNumber, type: "error" });
  };

  // render

  function render() {
    root.innerHTML = "";

    // render action bar
    crel(
      root,
      ActionBar({
        actions,
        corner: state.get("actions-corner"),
        trayIsOpen: state.getCache("tray-open"),
        onToggleTray: toggleTray
      })
    );

    // render tray
    if (actions.some(action => action.action === "toggle-tray")) {
      crel(
        root,
        Tray({
          state,
          trayIsOpen: state.getCache("tray-open"),
          trayHeight: state.getCache("tray-height"),
          log: state.get("log"),
          onResizeTray: resizeTray
        })
      );
    }
  }
  render();
}
