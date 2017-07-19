/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

//Copyright (C) 2012 Kory Nunn

//Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

//The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/*

    This code is not formatted for readability, but rather run-speed and to assist compilers.

    However, the code's intention should be transparent.

    *** IE SUPPORT ***

    If you require this library to work in IE7, add the following after declaring crel.

    var testDiv = document.createElement('div'),
        testLabel = document.createElement('label');

    testDiv.setAttribute('class', 'a');
    testDiv['className'] !== 'a' ? crel.attrMap['class'] = 'className':undefined;
    testDiv.setAttribute('name','a');
    testDiv['name'] !== 'a' ? crel.attrMap['name'] = function(element, value){
        element.id = value;
    }:undefined;


    testLabel.setAttribute('for', 'a');
    testLabel['htmlFor'] !== 'a' ? crel.attrMap['for'] = 'htmlFor':undefined;



*/

(function (root, factory) {
    if (true) {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root.crel = factory();
    }
}(this, function () {
    var fn = 'function',
        obj = 'object',
        nodeType = 'nodeType',
        textContent = 'textContent',
        setAttribute = 'setAttribute',
        attrMapString = 'attrMap',
        isNodeString = 'isNode',
        isElementString = 'isElement',
        d = typeof document === obj ? document : {},
        isType = function(a, type){
            return typeof a === type;
        },
        isNode = typeof Node === fn ? function (object) {
            return object instanceof Node;
        } :
        // in IE <= 8 Node is an object, obviously..
        function(object){
            return object &&
                isType(object, obj) &&
                (nodeType in object) &&
                isType(object.ownerDocument,obj);
        },
        isElement = function (object) {
            return crel[isNodeString](object) && object[nodeType] === 1;
        },
        isArray = function(a){
            return a instanceof Array;
        },
        appendChild = function(element, child) {
          if(!crel[isNodeString](child)){
              child = d.createTextNode(child);
          }
          element.appendChild(child);
        };


    function crel(){
        var args = arguments, //Note: assigned to a variable to assist compilers. Saves about 40 bytes in closure compiler. Has negligable effect on performance.
            element = args[0],
            child,
            settings = args[1],
            childIndex = 2,
            argumentsLength = args.length,
            attributeMap = crel[attrMapString];

        element = crel[isElementString](element) ? element : d.createElement(element);
        // shortcut
        if(argumentsLength === 1){
            return element;
        }

        if(!isType(settings,obj) || crel[isNodeString](settings) || isArray(settings)) {
            --childIndex;
            settings = null;
        }

        // shortcut if there is only one child that is a string
        if((argumentsLength - childIndex) === 1 && isType(args[childIndex], 'string') && element[textContent] !== undefined){
            element[textContent] = args[childIndex];
        }else{
            for(; childIndex < argumentsLength; ++childIndex){
                child = args[childIndex];

                if(child == null){
                    continue;
                }

                if (isArray(child)) {
                  for (var i=0; i < child.length; ++i) {
                    appendChild(element, child[i]);
                  }
                } else {
                  appendChild(element, child);
                }
            }
        }

        for(var key in settings){
            if(!attributeMap[key]){
                if(isType(settings[key],fn)){
                    element[key] = settings[key];
                }else{
                    element[setAttribute](key, settings[key]);
                }
            }else{
                var attr = attributeMap[key];
                if(typeof attr === fn){
                    attr(element, settings[key]);
                }else{
                    element[setAttribute](attr, settings[key]);
                }
            }
        }

        return element;
    }

    // Used for mapping one kind of attribute to the supported version of that in bad browsers.
    crel[attrMapString] = {};

    crel[isElementString] = isElement;

    crel[isNodeString] = isNode;

    if(typeof Proxy !== 'undefined'){
        crel.proxy = new Proxy(crel, {
            get: function(target, key){
                !(key in crel) && (crel[key] = crel.bind(null, key));
                return crel[key];
            }
        });
    }

    return crel;
}));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
module.exports = __webpack_require__(8);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {

  'use strict';

  function MobileDevEnvironment() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


    // Default options
    options = {
      group: typeof options.group !== 'undefined' ? options.group : 'global',
      reload: typeof options.reload !== 'undefined' ? options.reload : true,
      hardReload: typeof options.hardReload !== 'undefined' ? options.hardReload : true,
      logtray: typeof options.logtray !== 'undefined' ? options.logtray : true,
      displayErrors: typeof options.displayErrors !== 'undefined' ? options.displayErrors : true,
      controlbar: {
        position: typeof options.controlbar.position !== 'undefined' ? options.controlbar.position : 'tr',
        order: typeof options.controlbar.order !== 'undefined' ? options.controlbar.order : ['reload', 'logtray']
      }
    };

    // Import modules and tools
    var reloadButton = __webpack_require__(4);
    var logtray = __webpack_require__(5);
    var crel = __webpack_require__(0);
    var DB = __webpack_require__(7);
    DB = new DB(options.group);

    // inject control bar into page
    crel(document.body, crel('div', { 'id': 'mde-controlbar', 'class': 'mde-controlbar-' + options.controlbar.position }));

    // Run modules
    options.controlbar.order.forEach(function (module) {
      if (module === 'reload' && options.reload === true) new reloadButton(options);else if (module === 'logtray' && options.logtray === true) new logtray(options, DB);
    });
  }

  // Attach MDE to window
  window.MobileDevEnvironment = MobileDevEnvironment;

  // Export mde to node
  if (( false ? 'undefined' : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
    module.exports = MobileDevEnvironment;
  }
})();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function reloadButton(options) {

  'use strict';

  var crel = __webpack_require__(0),
      hardReload = options.hardReload === true;
  var button = void 0;

  // Create button
  button = crel('button', { 'id': 'mde-reload' });

  // Add svg icon to button
  button.innerHTML = '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/><path d="M0 0h24v24H0z" fill="none"/></svg>';

  // Listen to button
  button.addEventListener('click', function (e) {
    return location.reload(hardReload);
  });

  // Add to DOM
  crel(document.querySelector('#mde-controlbar'), button);
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function scrollInfo(elem) {
  var scrollTop = elem.scrollTop,
      scrollHeight = elem.scrollHeight,
      clientHeight = elem.clientHeight;

  return {
    top: scrollTop,
    bottom: scrollTop + clientHeight,
    height: clientHeight,
    atTop: scrollTop === 0,
    atBottom: scrollHeight - scrollTop <= clientHeight + 1,
    fullHeight: scrollHeight
  };
}

function logtray(options, DB) {

  'use strict';

  // initiate

  var self = this;

  // Libraries
  var tracer = __webpack_require__(6),
      crel = __webpack_require__(0);

  self.icon = { toggleTray: '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3v-3h18v3z"/></svg>' };
  // Global variables
  self.elements = {
    controlbar: document.querySelector('#mde-controlbar'),
    reload: document.querySelector('#mde-reload'),
    toggleTray: {},
    tray: {},
    resizeTray: {},
    logs: {}
  };

  // Setup variables if not setup already
  DB.set('logtrayOpen', DB.get('logtrayOpen') || false);
  DB.set('logtrayHeight', DB.get('logtrayHeight') || window.innerHeight * 0.25);

  buildlogtrayButton(DB.get('logtrayOpen'));
  buildlogtray(DB.get('logtrayOpen'));

  // Bind toggle tray after all elements created in DOM
  self.elements.toggleTray.addEventListener('click', function (e) {
    return toggleLogTray(DB.get('logtrayOpen'));
  }, false);

  window.console.log = function (message) {
    // Gather message trace information
    var trace = tracer(new Error());

    log(message, trace);
  };

  if (options.displayErrors === true) {
    window.onerror = function (message, filePath, lineNumber) {
      var fileName = filePath.replace(/^.*[\\\/]/, '');
      log(message, { fileName: fileName, filePath: filePath, lineNumber: lineNumber, isError: true });
    };
  }

  function buildlogtrayButton(state) {
    state = state ? 'active' : '';
    crel(self.elements.controlbar, self.elements.toggleTray = crel('button', { 'id': 'mde-toggle-logtray', 'class': 'mde ' + state }));
    self.elements.toggleTray.innerHTML = self.icon.toggleTray;
  }

  function buildlogtray() {
    state = state() ? 'active' : '';
    crel(document.body, self.elements.tray = crel('div', { 'id': 'mde-logtray', 'class': 'mde ' + state }, self.elements.resizeTray = crel('button', { 'id': 'mde-logtray-resize-bar', 'class': 'mde' }), self.elements.logs = crel('div', { 'id': 'mde-logs' })));
    self.elements.resizeTray.innerHTML = '&bull; &bull; &bull;';

    setTrayHeight(DB.get('logtrayHeight'));

    window.addEventListener('resize', function (e) {
      return setTrayHeight(DB.get('logtrayHeight'));
    }, false);
    self.elements.resizeTray.addEventListener('touchstart', function (e) {
      return resizeLogTray(e);
    }, false);
    self.elements.resizeTray.addEventListener('mousedown', function (e) {
      return resizeLogTray(e);
    }, false);
  }

  // constants

  function state() {
    return DB.get('logtrayOpen');
  }

  // modify global

  function setTrayHeight(height) {
    // set min height to match resize button height
    var min = self.elements.controlbar.offsetHeight;

    // Set max height based on if reload button is displayed
    var max = window.innerHeight - (self.elements.controlbar.offsetHeight + 20);

    // Ensure height is within range, if not get closest value
    height = height > max ? max : height;
    height = height < min ? min : height;

    // Update logtray height and store value in DB
    self.elements.tray.style.height = height + 'px';
    DB.set('logtrayHeight', height);
  }

  // actions

  function toggleLogTray(state) {
    DB.set('logtrayOpen', !state);
    self.elements.toggleTray.classList.toggle('active', !state);
    self.elements.tray.classList.toggle('active', !state);
  }

  // Resize logtray by dragging up and down on the bar
  function resizeLogTray(e) {
    // starting y coordinate on screen (from touch input or mouse)
    var startY = e.type === 'touchstart' ? e.changedTouches[0].clientY : e.clientY;
    // starting height of logtray
    var startH = DB.get('logtrayHeight');
    // check if log tray is scrolled to bottom,
    var startScrolledBottom = self.elements.logs.scrollHeight - self.elements.logs.scrollTop <= self.elements.logs.clientHeight + 1;
    // check if log tray is scrolled to top
    var startScrolledTop = self.elements.logs.scrollTop === 0;

    var onMove = function onMove(e) {
      // Get current y position on screen
      var currentY = e.type === 'touchmove' ? e.changedTouches[0].clientY : e.clientY;
      // Calculate distance between starting and current Y
      var dragDistance = startY - currentY;

      // Update tray height
      setTrayHeight(startH + dragDistance);

      // If logtray is scrolled to the bottom, ensure it remains that way
      if (startScrolledBottom) {
        self.elements.logs.scrollTop = self.elements.logs.scrollHeight;
      }
    };

    function onEnd(e) {
      // remove listeners to prevent stacking and conflictions
      e.target.removeEventListener('touchmove', onMove, false);
      e.target.removeEventListener('touchend', onEnd, false);
      document.removeEventListener('mousemove', onMove, false);
      document.removeEventListener('mouseup', onEnd, false);
    }

    // Handle input dragging logtray resize bar
    e.target.addEventListener('touchmove', onMove, false);
    e.target.addEventListener('touchend', onEnd, false);
    document.addEventListener('mousemove', onMove, false);
    document.addEventListener('mouseup', onEnd, false);
  }

  function log(message, trace) {
    var filePath = trace.filePath,
        fileName = trace.fileName,
        lineNumber = trace.lineNumber,
        isError = trace.isError;


    var initialScroll = scrollInfo(self.elements.logs);

    var logs = self.elements.logs;
    var lastLog = logs.lastChild || false;
    var lastMessage = (typeof lastLog === 'undefined' ? 'undefined' : _typeof(lastLog)) === 'object' ? lastLog.querySelector('.mde-log-message-full').innerHTML : null;

    var id = 'log-' + logs.children.length;
    var type = void 0;

    // Get and handle var types
    if (type === 'error') {
      type = 'error';
    } else if (typeof message === "string") {
      type = 'string';
    } else if (typeof message === "number") {
      type = 'number';
    } else if (typeof message === "boolean") {
      type = 'boolean';
    } else if ((typeof message === 'undefined' ? 'undefined' : _typeof(message)) === "object") {
      type = 'object';
    } else if (Array.isArray(message)) {
      type = 'array';
    } else if (message === null) {
      type = 'null';
    } else if (message == null) {
      type = 'undefined';
    }

    // manually set 'undefined' and 'null' messages which when left alone will display nothing at all
    if (type === 'null' || type === 'undefined') {
      message = type;
      // convert objects and arrays to string
    } else if (type === 'object' || type === 'array') {
      message = JSON.stringify(message, undefined, 2);
      // convert number and boolean values to string
    } else if (type === 'number' || type === 'boolean') {
      message = message.toString();
    }

    var submitted = void 0;

    if (message !== lastMessage) {
      var _submitted = crel('div', { 'class': 'mde-log mde-log-type-' + type }, crel('div', { 'class': 'mde-log-amount' }), crel('div', { 'class': 'mde-log-message-single' }, message), crel('a', { 'class': 'mde-log-trace', 'href': filePath, 'target': '_blank' }, fileName + ':' + lineNumber), crel('pre', { 'class': 'mde-log-message-full' }));

      _submitted.querySelector('.mde-log-message-full').innerHTML = message;

      // Listen for toggling full message
      _submitted.querySelector('.mde-log-message-single').addEventListener('click', function (e) {
        _submitted.classList.toggle('mde-log-open');
      });

      // Append log to DOM
      crel(self.elements.logs, _submitted);
    } else {
      var stackSize = parseInt(lastLog.querySelector('.mde-log-amount').innerText) || 1;
      lastLog.querySelector('.mde-log-amount').innerText = stackSize + 1;
    }

    if (initialScroll.atBottom) {
      logs.scrollTop = logs.scrollHeight;
    }
  }
}

module.exports = logtray;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Provide an error and retrieve trace information
module.exports = function tracer(error, type) {
    // Get stack as string
    var stack = error.stack;
    // Get last line of stack
    stack = stack.split("\n")[stack.split("\n").length - 1];
    // Break stack into pieces of information
    var pieces = stack.split(":");
    // Get line number
    var lineNumber = pieces[3];
    // Get file path
    var filePath = (pieces[0].split('at ').join('') + ':' + pieces[1]).replace(/ /g, '');
    // Get file name
    var fileName = filePath.replace(/^.*[\\\/]/, '');

    return {
        fileName: fileName.length > 0 ? fileName : 'N/A',
        filePath: filePath,
        lineNumber: lineNumber
    };
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function DB() {
    var _this = this;

    var group = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'global';

    // share state information with other instances of mde
    // for seamless use across multiple client pages
    this._group = group;

    // prepare key: {mde-group-key}
    this._getKey = function (key) {
        return 'mde-' + _this._group + '-' + key;
    };

    // retrieve data
    this.get = function (key) {
        var result = localStorage[this._getKey(key)];
        return typeof result !== 'undefined' ? JSON.parse(result) : null;
    };

    // set data
    this.set = function (key, value) {
        return localStorage[this._getKey(key)] = JSON.stringify(value);
    };
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=mde.js.map