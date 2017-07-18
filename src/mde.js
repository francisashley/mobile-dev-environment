(function() {

  'use strict';

  function MobileDevEnvironment(options = {}) {

    // Default options
    options = {
      group         :  typeof options.group         !== 'undefined'   ?   options.group         :   'global',
      reload        :  typeof options.reload        !== 'undefined'   ?   options.reload        :   true,
      hardReload    :  typeof options.hardReload    !== 'undefined'   ?   options.hardReload    :   true,
      logtray       :  typeof options.logtray       !== 'undefined'   ?   options.logtray       :   true,
      logErrors     :  typeof options.logErrors     !== 'undefined'   ?   options.logErrors     :   true,
    };

    // Import modules and tools
    const reloadButton = require('./modules/reloadButton.js');
    const logtray      = require('./modules/logtray.js');
    let DB             = require('./tools/db.js');
        DB             = new DB(options.group);

    // Run modules
    if (options.reload === true)  new reloadButton(options);
    if (options.logtray === true) new logtray(options, DB);
  }

  // Attach MDE to window
  window.MobileDevEnvironment = MobileDevEnvironment;

  // Export mde to node
  if (typeof module === "object" && typeof module.exports === "object") {
      module.exports = MobileDevEnvironment;
  }
})();