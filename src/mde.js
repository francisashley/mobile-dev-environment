(function() {
  "use strict";

  function MobileDevEnvironment(options = {}) {
    // Default options
    options = {
      group: typeof options.group !== "undefined" ? options.group : "global",
      modules: typeof options.modules !== "undefined" ? options.modules : ["reload", "logtray"],
      controlbarOrder:
        typeof options.controlbarOrder !== "undefined"
          ? options.controlbarOrder
          : ["reload", "logtray"],
      controlbarPosition:
        typeof options.controlbarPosition !== "undefined" ? options.controlbarPosition : "tr",
      hardReload: typeof options.hardReload !== "undefined" ? options.hardReload : true,
      displayErrors: typeof options.displayErrors !== "undefined" ? options.displayErrors : true,
      useConsoleLog: typeof options.useConsoleLog !== "undefined" ? options.useConsoleLog : false
    };
    // Import modules and tools
    const reloadButton = require("./modules/reloadButton.js");
    const logtray = require("./modules/logtray.js");
    const crel = require("crel");
    let DB = require("./tools/db.js");
    DB = new DB(options.group);
    // inject control bar into page
    crel(
      document.body,
      crel("div", { id: "mde-controlbar", class: "mde-controlbar-" + options.controlbarPosition })
    );
    // Run modules
    options.controlbarOrder.forEach(module => {
      if (module === "reload" && options.modules.includes("reload")) new reloadButton(options);
      else if (module === "logtray" && options.modules.includes("logtray"))
        new logtray(options, DB);
    });
  }

  // Attach MDE to window
  window.MobileDevEnvironment = MobileDevEnvironment;

  // Export mde to node
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = MobileDevEnvironment;
  }
})();
