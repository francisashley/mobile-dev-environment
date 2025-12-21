import app from "src/features/app/app";
import "./index.scss";

(function() {
  "use strict";

  function mobileDevEnvironment({ root, stateId, actions, actionsCorner } = {}) {
    if (!(root instanceof Element)) {
      throw "Could not start MDE because MDE requires a `root` element to attach to the DOM.";
    }

    // DEFAULT VARIABLES
    stateId = stateId ?? "global";
    actionsCorner = actionsCorner ?? "tr";
    actions = actions ?? ["reload", "toggle-tray"];

    actions = actions
      .map(action => {
        if (typeof action === "string" && action === "reload") {
          action = { action: "reload" };
        } else if (typeof action === "string" && action === "toggle-tray") {
          action = { action: "toggle-tray" };
        }

        if (action && typeof action === "object" && action.action === "reload") {
          return { action: "reload", refreshCache: action.refreshCache ?? true };
        } else if (action && typeof action === "object" && action.action === "toggle-tray") {
          return { action: "toggle-tray" };
        } else if (action && typeof action === "object" && action.action === "custom") {
          return {
            action: "custom",
            content: action.content ?? "",
            onClick: action.onClick ?? (() => {})
          };
        }

        return null;
      })
      .filter(Boolean);

    // RUN

    app({
      root,
      stateId,
      actions,
      actionsCorner
    });
  }

  // Enable usage in the browser
  window.mobileDevEnvironment = mobileDevEnvironment;

  // Enable usage in Node
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = mobileDevEnvironment;
  }
})();
