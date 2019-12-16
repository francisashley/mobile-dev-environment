import { defaultTo, isElement } from "lodash";

import app from "src/features/app/app";

(function() {
  "use strict";

  function mobileDevEnvironment({ root, stateId, actions, actionsCorner, hardReload } = {}) {
    if (!isElement(root)) {
      throw "Could not start MDE because MDE requires a `root` element to attach to the DOM.";
    }

    // DEFAULT VARIABLES
    stateId = defaultTo(stateId, "global");
    actions = defaultTo(actions, ["reload", "toggle-tray"]);
    actionsCorner = defaultTo(actionsCorner, "tr");
    hardReload = defaultTo(hardReload, true);

    // RUN

    app({
      root,
      stateId,
      actions,
      actionsCorner,
      hardReload
    });
  }

  // Enable usage in the browser
  window.mobileDevEnvironment = mobileDevEnvironment;

  // Enable usage in Node
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = mobileDevEnvironment;
  }
})();
