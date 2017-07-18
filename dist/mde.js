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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(6);


/***/ }),
/* 1 */
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
      logErrors: typeof options.logErrors !== 'undefined' ? options.logErrors : true
    };

    // Import modules and tools
    var reloadButton = __webpack_require__(3);
    var logtray = __webpack_require__(4);
    var DB = __webpack_require__(5);
    DB = new DB(options.group);

    // Run modules
    if (options.reload === true) new reloadButton(options);
    if (options.logtray === true) new logtray(options, DB);
  }

  // Attach MDE to window
  window.MobileDevEnvironment = MobileDevEnvironment;

  // Export mde to node
  if (( false ? 'undefined' : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
    module.exports = MobileDevEnvironment;
  }
})();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function fetch(query) {
  return document.querySelector('#mde-' + query);
}

function query(elem, query) {
  return elem.querySelector(query);
}

function insert(html, elem) {
  var position = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'beforeend';

  return elem.insertAdjacentHTML(position, html);
}

function containsClass(elem, cls) {
  return elem.classList.contains(cls);
}

function toggleClass(elem, cls, assert) {
  return elem.classList.toggle(cls, assert);
}

function getType(obj) {
  var type = {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  return Number.isNaN(obj) ? 'NaN' : type;
}

function toString(obj, type) {
  switch (type) {
    case 'string':
      return obj;
    case 'undefined':
      return 'undefined';
    case 'NaN':
      return 'NaN';
    default:
      return JSON.stringify(obj);
  }
}

function touches(e) {
  return e.changedTouches;
}

function getDragDistance(dragStart, dragEnd) {
  return {
    x: dragStart.pageX - dragEnd.pageX,
    y: dragStart.pageY - dragEnd.pageY
  };
}

function returnInRange(num, min, max) {
  num = num > max ? max : num;
  return num < min ? min : num;
}

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

function returnTraceFromError(error) {
  // get relevant trace parts
  var bits = error.stack.split(":").slice(4, 9);
  // clear redundant chars at start and end
  var first = bits[0];
  bits[0] = first.substring(first.indexOf('(') + 1, first.length);
  var last = bits[bits.length - 1];
  bits[bits.length - 1] = last.substring(0, last.indexOf(')'));
  // compile
  var fileName = bits[2].replace(/^.*[\\\/]/, '');
  return {
    fileName: fileName.length > 0 ? fileName : 'N/A',
    filePath: fileName.length > 0 ? bits[0] + ':' + bits[1] + ':' + bits[2] : '',
    lineNumber: bits[3]
  };
}

function reload(options) {
  var hardReload = options.hardReload;


  insert('<button id="mde-reload" class="mde"></button>', document.body);
  fetch('reload').addEventListener('click', function (e) {
    location.reload(hardReload);
  }, false);
}

module.exports = reload;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function fetch(query) {
  return document.querySelector('#mde-' + query);
}

function query(elem, query) {
  return elem.querySelector(query);
}

function insert(html, elem) {
  var position = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'beforeend';

  return elem.insertAdjacentHTML(position, html);
}

function containsClass(elem, cls) {
  return elem.classList.contains(cls);
}

function toggleClass(elem, cls, assert) {
  return elem.classList.toggle(cls, assert);
}

function getType(obj) {
  var type = {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  return Number.isNaN(obj) ? 'NaN' : type;
}

function toString(obj, type) {
  switch (type) {
    case 'string':
      return obj;
    case 'undefined':
      return 'undefined';
    case 'NaN':
      return 'NaN';
    default:
      return JSON.stringify(obj);
  }
}

function touches(e) {
  return e.changedTouches;
}

function getDragDistance(dragStart, dragEnd) {
  return {
    x: dragStart.pageX - dragEnd.pageX,
    y: dragStart.pageY - dragEnd.pageY
  };
}

function returnInRange(num, min, max) {
  num = num > max ? max : num;
  return num < min ? min : num;
}

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

function returnTraceFromError(error) {
  // get relevant trace parts
  var bits = error.stack.split(":").slice(4, 9);
  // clear redundant chars at start and end
  var first = bits[0];
  bits[0] = first.substring(first.indexOf('(') + 1, first.length);
  var last = bits[bits.length - 1];
  bits[bits.length - 1] = last.substring(0, last.indexOf(')'));
  // compile
  var fileName = bits[2].replace(/^.*[\\\/]/, '');
  return {
    fileName: fileName.length > 0 ? fileName : 'N/A',
    filePath: fileName.length > 0 ? bits[0] + ':' + bits[1] + ':' + bits[2] : '',
    lineNumber: bits[3]
  };
}

function logtray(options, DB) {
  // Setup variables if not setup already
  DB.set('logtrayOpen', DB.get('logtrayOpen') || false);
  DB.set('logtrayHeight', DB.get('logtrayHeight') || window.innerHeight * 0.25);

  buildlogtrayButton();
  buildlogtray();
  window.console.log = function (message) {
    var trace = returnTraceFromError(new Error());
    log(message, trace);
  };

  if (options.logErrors === true) {
    window.onerror = function (message, filePath, lineNumber) {
      var fileName = filePath.replace(/^.*[\\\/]/, '');
      log(message, { fileName: fileName, filePath: filePath, lineNumber: lineNumber, isError: true });
    };
  }

  function buildlogtrayButton() {
    insert('<button id="mde-open-logtray" class="mde ' + state() + '"></button>', document.body);
    fetch('open-logtray').addEventListener('click', function (e) {
      open();
    }, false);
  }

  function buildlogtray() {
    insert('<div id="mde-logtray" class="mde ' + state() + '">\n          <button id="mde-resize-logtray" class="mde">\xB7\xB7\xB7</button>\n          <button id="mde-close-logtray" class="mde">\u2014</button>\n          <div id="mde-logs"></div>\n        </div>', document.body);

    setHeight(height());

    var closeButton = fetch('close-logtray');
    var resizeButton = fetch('resize-logtray');

    window.addEventListener('resize', function (e) {
      setHeight(height());
    }, false);
    closeButton.addEventListener('click', function (e) {
      close();
    }, false);
    resizeButton.addEventListener('touchstart', function (e) {
      resizeButton.classList.add('pressed');
      resize(e);
      e.preventDefault();
    }, false);
    resizeButton.addEventListener('touchend', function (e) {
      resizeButton.classList.remove('pressed');
    }, false);
  }

  // constants

  function state() {
    return DB.get('logtrayOpen');
  }

  function height() {
    return DB.get('logtrayHeight');
  }

  function minHeight() {
    return fetch('resize-logtray').offsetHeight;
  }

  function maxHeight() {
    return window.innerHeight - (options.reload ? fetch('reload').offsetHeight + 20 : 10);
  }

  // modify global

  function setHeight(height) {
    minHeight = minHeight();
    maxHeight = maxHeight();
    height = returnInRange(height, minHeight, maxHeight);
    DB.set('logtrayHeight', height);
    fetch('logtray').style.height = height + 'px';
  }

  // actions

  function open() {
    DB.set('logtrayOpen', true);
    fetch('open-logtray').classList = true;
    fetch('logtray').classList = true;
  }

  function close() {
    DB.set('logtrayOpen', false);
    fetch('open-logtray').classList = false;
    fetch('logtray').classList = false;
  }

  function resize(e) {
    var _this = this;

    var startHeight = height;
    var startTouch = touches(e)[0];
    var startScroll = scrollInfo(fetch('logs'));

    var onMove = function onMove(e) {
      var distance = getDragDistance(startTouch, touches(e)[0]);
      var newHeight = startHeight + distance.y;
      _this.setHeight(newHeight);

      if (startScroll.atBottom && distance.y < startScroll.top) {
        fetch('logs').scrollTop = fetch('logs').scrollHeight;
      }
    };

    var onEnd = function onEnd(e) {
      resizeButton.removeEventListener('touchmove', onMove, false);
      resizeButton.removeEventListener('touchend', onEnd, false);
    };

    var resizeButton = fetch('resize-logtray');
    resizeButton.addEventListener('touchmove', onMove, false);
    resizeButton.addEventListener('touchend', onEnd, false);
  }

  function log(message, trace) {
    var filePath = trace.filePath,
        fileName = trace.fileName,
        lineNumber = trace.lineNumber,
        isError = trace.isError;


    var initialScroll = scrollInfo(fetch('logs'));

    var logs = fetch('logs');
    var lastLog = logs.lastChild || false;
    var lastMessage = lastLog ? query(lastLog, '.message').innerText : false;

    var id = 'log-' + logs.children.length;
    var type = isError ? 'error' : getType(message);
    message = toString(message, type);

    if (message !== lastMessage) {
      insert('<div id="mde-' + id + '" class="log ' + type + '">' + '<div class="preview">' + '<div class="stack"></div>' + '<a class="trace" href="' + filePath + '" target="_blank">' + fileName + ':' + lineNumber + '</a>' + '<div class="message"></div>' + '</div>' + '<div class="full"></div>' + '</div>', logs);

      var submitted = fetch(id);

      query(submitted, '.preview .message').innerText = message;
      query(submitted, '.full').innerText = message;

      query(submitted, '.preview').addEventListener('click', function (e) {
        if (!containsClass(e.target, 'trace')) {
          var clickedLog = e.target.closest('.log');
          toggleClass(clickedLog, 'expand');
        }
      });
    } else {
      var stackSize = parseInt(query(lastLog, '.stack').innerText) || 1;
      query(lastLog, '.stack').innerText = stackSize + 1;
    }

    if (initialScroll.atBottom) {
      logs.scrollTop = logs.scrollHeight;
    }
  }
}

module.exports = logtray;

/***/ }),
/* 5 */
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
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=mde.js.map