(function() {

  'use strict';

  const reloadButton = require('./modules/reloadButton.js');
  const logtray       = require('./modules/logtray.js');

  function MobileDevEnvironment(options) {
    // Default options
    options = {
      group           :  typeof options.group           !== 'undefined'   ?   options.group           :   'global',
      reload          :  typeof options.reload          !== 'undefined'   ?   options.reload          :   true,
      hardReload      :  typeof options.hardReload      !== 'undefined'   ?   options.hardReload      :   true,
      logtray          :  typeof options.logtray          !== 'undefined'   ?   options.logtray         :   true,
      logErrors       :  typeof options.logErrors       !== 'undefined'   ?   options.logErrors   :   true,
    };

    if (options.reload === true) {
      this.reload = new reloadButton( { hardReload: options.hardReload } );
    }

    if (options.logtray === true) {
      this.logtray = new logtray({reload: options.reload, logErrors: options.logErrors, group: options.group});
    }
  }

  window.MobileDevEnvironment = MobileDevEnvironment;
})();