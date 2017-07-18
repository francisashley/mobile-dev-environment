  function touches(e) {
    return e.changedTouches;
  }

  function getDragDistance(dragStart, dragEnd) {
    return {
      x: dragStart.pageX-dragEnd.pageX,
      y: dragStart.pageY-dragEnd.pageY
    }
  }

  function returnInRange(num, min, max) {
    num  = num > max ? max : num;
    return num < min ? min : num;
  }

  function scrollInfo(elem) {
    const {scrollTop, scrollHeight, clientHeight} = elem;
    return {
      top:        scrollTop,
      bottom:     scrollTop + clientHeight,
      height:     clientHeight,
      atTop:      scrollTop === 0,
      atBottom:   scrollHeight - scrollTop <= clientHeight + 1,
      fullHeight: scrollHeight
    }
  }


function logtray(options, DB) {

  'use strict';

  // initiate
  let self = this;

  // Libraries
  const tracer  = require('../tools/tracer.js'),
        crel    = require('crel');

  // Global variables
  self.elements = {
    reload: document.querySelector('#mde-reload'),
    openTray: {},
    closeTray: {},
    tray: {},
    resizeTray: {},
    logs: {}
  };

  // Setup variables if not setup already
  DB.set('logtrayOpen', DB.get('logtrayOpen') || false);
  DB.set('logtrayHeight', DB.get('logtrayHeight') || window.innerHeight * 0.25);


  buildlogtrayButton();
  buildlogtray();

  window.console.log = (message) => {
    // Gather message trace information
    const trace = tracer(new Error());

    log(message, trace);
  };

  if (options.logErrors === true) {
    window.onerror = (message, filePath, lineNumber) => {
      const fileName = filePath.replace(/^.*[\\\/]/, '');
      log(message, {fileName, filePath, lineNumber, isError: true});
    }
  }

  function buildlogtrayButton() {
    crel(document.body,
      self.elements.openTray = crel('button', { 'id': 'mde-open-logtray', 'class': 'mde ' + status } )
    );

    self.elements.openTray.addEventListener('click', (e) => {
      open();
    }, false);
  }

  function buildlogtray() {
    crel(document.body,
      self.elements.tray = crel('div',
         { 'id': 'mde-logtray', 'class': `mde ${state()}`},
        self.elements.resizeTray = crel('button', {'id': 'mde-resize-logtray', 'class': 'mde'}),
        self.elements.closeTray = crel('button', {'id': 'mde-close-logtray', 'class': 'mde'}),
        self.elements.logs = crel('div', {'id': 'mde-logs'})
      )
    );

    setHeight(height());

    window.addEventListener('resize', (e) => {
      setHeight(height());
    }, false);
    self.elements.closeTray.addEventListener('click', (e) => {
      close();
    }, false);
    self.elements.resizeTray.addEventListener('touchstart', (e) => {
      self.elements.resizeTray.classList.add('pressed');
      resize(e);
      e.preventDefault();
    }, false);
    self.elements.resizeTray.addEventListener('touchend', (e) => {
      self.resizeTray.classList.remove('pressed');
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
    return self.elements.resizeTray.offsetHeight;
  }

  function maxHeight() {
    return window.innerHeight - (options.reload ? self.elements.reload.offsetHeight + 20 : 10);
  }

  // modify global

  function setHeight(height) {
    const min = minHeight()
    const max = maxHeight()
    height = returnInRange(height, min, max);
    DB.set('logtrayHeight', height);
    console.log(self.elements)
    self.elements.tray.style.height = height+'px';
  }

  // actions

  function open() {
    DB.set('logtrayOpen', true);
    self.elements.openTray.classList = true;
    self.elements.tray.classList = true;
  }

  function close() {
    DB.set('logtrayOpen', false);
    self.elements.openTray.classList = false;
    self.elements.tray.classList = false;
  }

  function resize(e) {
    const startHeight = height;
    const startTouch  = touches(e)[0];
    const startScroll = scrollInfo(self.elements.logs);

    const onMove = (e) => {
      const distance = getDragDistance(startTouch, touches(e)[0]);
      const newHeight = startHeight+distance.y;
      this.setHeight(newHeight);

      if (startScroll.atBottom && distance.y < startScroll.top) {
        self.elements.logs.scrollTop = self.elements.logs.scrollHeight;
      }
    };

    const onEnd = (e) => {
      self.elements.resizeTray.removeEventListener('touchmove', onMove, false);
      self.elements.resizeTray.removeEventListener('touchend', onEnd, false);
    };

    self.elements.resizeTray.addEventListener('touchmove', onMove, false);
    self.elements.resizeTray.addEventListener('touchend', onEnd, false);
  }

  function log(message, trace) {
    const { filePath, fileName, lineNumber, isError } = trace;

    const initialScroll = scrollInfo(self.elements.logs);

    const logs = self.elements.logs;
    const lastLog = logs.lastChild || false;
    const lastMessage = typeof lastLog === 'object' ? lastLog.querySelector('.message').innerHTML : null;

    const id = 'log-'+logs.children.length;
    let type;

    // Get and handle var types
    if (type === 'error') {
      type = 'error';
    } else if (typeof message === "string") {
      type = 'string';
    } else if (typeof message === "number") {
      type = 'number';
    } else if (typeof message === "boolean") {
      type = 'boolean';
    } else if (typeof message === "object") {
      type = 'object';
    } else if (Array.isArray( message )) {
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

    let submitted ;

    if (message !== lastMessage) {
      crel(logs,
      submitted =  crel('div',
          { 'id': 'mde-' + id, 'class': 'log ' + type },
          crel('div',
            {'class': 'preview'},
            crel('div', { 'class': 'stack' } ),
            crel('a', { 'class': 'trace', 'href': filePath, 'target': '_blank' }, fileName+':'+lineNumber),
            crel('div', { 'class': 'message' } )
          ),
          crel('div', {'class': 'full'})
        )
      );

      submitted.querySelector('.preview .message').innerText = message;
      submitted.querySelector('.full').innerText = message;

      submitted.querySelector('.preview').addEventListener('click', (e) => {
        if (!e.target.classList.contains('trace')) {
          const clickedLog = e.target.closest('.log');
          clickedLog.classList.toggle('expand');
        }
      });
    } else {
      const stackSize = parseInt(lastLog.querySelector('.stack').innerText) || 1;
      lastLog.querySelector('.stack').innerText = stackSize+1;
    }

    if (initialScroll.atBottom) {
      logs.scrollTop = logs.scrollHeight;
    }
  }
}

module.exports = logtray;