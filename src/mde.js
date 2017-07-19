(function() {

  'use strict';

  function MobileDevEnvironment(options = {}) {

    // Default options
    options = {
      group           :  typeof options.group           !== 'undefined'   ?   options.group           :   'global',
      reload          :  typeof options.reload          !== 'undefined'   ?   options.reload          :   true,
      hardReload      :  typeof options.hardReload      !== 'undefined'   ?   options.hardReload      :   true,
      logtray         :  typeof options.logtray         !== 'undefined'   ?   options.logtray         :   true,
      displayErrors   :  typeof options.displayErrors   !== 'undefined'   ?   options.displayErrors   :   true,
      controlbar      : {
        order       :  typeof options.controlbar.order      !== 'undefined'   ?   options.controlbar.order      :   ['reload', 'logtray']
      }
    };

    // Import modules and tools
    const reloadButton  = require('./modules/reloadButton.js');
    const logtray       = require('./modules/logtray.js');
    const crel          = require('crel');
    let DB              = require('./tools/db.js');
    DB                  = new DB(options.group);

    // inject control bar into page
    crel(document.body,
      crel('div', { 'id': 'mde-controlbar' } )
    );

    // Run modules
    options.controlbar.order.forEach((module) => {
      if (module === 'reload' && options.reload === true) new reloadButton(options);
      else if (module === 'logtray' && options.logtray === true) new logtray(options, DB);
    });
  }

  // Attach MDE to window
  window.MobileDevEnvironment = MobileDevEnvironment;

  // Export mde to node
  if (typeof module === "object" && typeof module.exports === "object") {
      module.exports = MobileDevEnvironment;
  }
})();