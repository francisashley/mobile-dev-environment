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

  self.icon     = { toggleTray: '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3v-3h18v3z"/></svg>' };
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
  self.elements.toggleTray.addEventListener('click', (e) => toggleLogTray(DB.get('logtrayOpen')), false);

  window.console.log = (message) => {
    // Gather message trace information
    const trace = tracer(new Error());

    log(message, trace);
  };

  if (options.displayErrors === true) {
    window.onerror = (message, filePath, lineNumber) => {
      const fileName = filePath.replace(/^.*[\\\/]/, '');
      log(message, {fileName, filePath, lineNumber, isError: true});
    }
  }

  function buildlogtrayButton(state) {
    state = state ? 'active': '';
    crel(self.elements.controlbar,
      self.elements.toggleTray = crel('button', { 'id': 'mde-toggle-logtray', 'class': 'mde ' + state } )
    );
    self.elements.toggleTray.innerHTML = self.icon.toggleTray;
  }

  function buildlogtray() {
    state = state() ? 'active': '';
    crel(document.body,
      self.elements.tray = crel('div',
         { 'id': 'mde-logtray', 'class': `mde ${state}`},
        self.elements.resizeTray = crel('button', {'id': 'mde-resize-logtray', 'class': 'mde'}),
        self.elements.logs = crel('div', {'id': 'mde-logs'})
      )
    );
    self.elements.resizeTray.innerHTML = '&bull; &bull; &bull;';

    setTrayHeight(DB.get('logtrayHeight'));

    window.addEventListener('resize', (e) => setTrayHeight(DB.get('logtrayHeight')), false);
    self.elements.resizeTray.addEventListener('touchstart', (e) => resizeLogTray(e), false);
    self.elements.resizeTray.addEventListener('mousedown', (e) => resizeLogTray(e), false);
  }

  // constants

  function state() {
    return DB.get('logtrayOpen');
  }

  // modify global

  function setTrayHeight(height) {
    // set min height to match resize button height
    const min = self.elements.controlbar.offsetHeight;

    // Set max height based on if reload button is displayed
    const max = window.innerHeight - (options.reload ? self.elements.reload.offsetHeight + 20 : 10);

    // Ensure height is within range, if not get closest value
    height = height > max ? max : height;
    height = height < min ? min : height;

    // Update logtray height and store value in DB
    self.elements.tray.style.height = height+'px';
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
    const startY = e.type === 'touchstart' ? e.changedTouches[0].clientY : e.clientY;
    // starting height of logtray
    const startH = DB.get('logtrayHeight');
    // check if log tray is scrolled to bottom,
    const startScrolledBottom = self.elements.logs.scrollHeight - self.elements.logs.scrollTop <= self.elements.logs.clientHeight + 1;
    // check if log tray is scrolled to top
    const startScrolledTop = self.elements.logs.scrollTop === 0;

    const onMove = (e) => {
      // Get current y position on screen
      const currentY = e.type === 'touchmove' ? e.changedTouches[0].clientY : e.clientY;
      // Calculate distance between starting and current Y
      const dragDistance = startY - currentY;

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