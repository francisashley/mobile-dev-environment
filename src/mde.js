(function() {

    'use strict';

    const reloadButton = require('./modules/reloadButton.js');
    const logbox       = require('./modules/logbox.js');

    function MobileDevEnvironment(options) {
        // Default options
        options = {
            group           :  typeof options.group           !== 'undefined'   ?   options.group           :   'global',
            reload          :  typeof options.reload          !== 'undefined'   ?   options.reload          :   true,
            hardReload      :  typeof options.hardReload      !== 'undefined'   ?   options.hardReload      :   true,
            logbox          :  typeof options.logbox          !== 'undefined'   ?   options.logbox         :   true,
            logErrors       :  typeof options.logErrors       !== 'undefined'   ?   options.logErrors   :   true,
        };

        if (options.reload === true) {
            this.reload = new reloadButton( { hardReload: options.hardReload } );
        }

        if (options.logbox === true) {
            this.logbox = new logbox({reload: options.reload, logErrors: options.logErrors, group: options.group});
        }
    }

    window.MobileDevEnvironment = MobileDevEnvironment;
})();