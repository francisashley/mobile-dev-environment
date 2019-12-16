import { defaultTo, isElement, isObject } from "lodash";

import app from "src/features/app/app";

(function() {
  "use strict";

  function mobileDevEnvironment({ root, stateId, actions, actionsCorner } = {}) {
    if (!isElement(root)) {
      throw "Could not start MDE because MDE requires a `root` element to attach to the DOM.";
    }

    // DEFAULT VARIABLES
    stateId = defaultTo(stateId, "global");
    actionsCorner = defaultTo(actionsCorner, "tr");
    actions = defaultTo(actions, ["reload", "toggle-tray"]);

    actions = actions
      .map(action => {
        if (typeof action === "string" && action === "reload") {
          action = { action: "reload" };
        } else if (typeof action === "string" && action === "toggle-tray") {
          action = { action: "toggle-tray" };
        }

        if (isObject(action) && action.action === "reload") {
          return { action: "reload", refreshCache: defaultTo(action.refreshCache, true) };
        } else if (isObject(action) && action.action === "toggle-tray") {
          return { action: "toggle-tray" };
        } else if (isObject(action) && action.action === "custom") {
          return {
            action: "custom",
            content: defaultTo(action.content, ""),
            onClick: defaultTo(action.onClick, () => {})
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
