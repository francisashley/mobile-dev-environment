module.exports = function logtray(options, DB) {

  'use strict';

  // initiate
  let self = this;

  // Libraries
  const tracer  = require('../tools/tracer.js'),
        crel    = require('crel');

  // Live functions
  self.isOpen   = () => DB.get('logtrayOpen') == true;
  self.height   = () => DB.get('logtrayHeight') || window.innerHeight * 0.25;

  // Global variables
  self.status   = self.isOpen() ? 'active' : '';
  self.icon     = { toggleTray: '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3v-3h18v3z"/></svg>' };
  self.elements = {
    controlbar: document.querySelector('#mde-controlbar'),
    reload: document.querySelector('#mde-reload'),
    toggleTray: {},
    tray: {},
    resizeTray: {},
    logs: {}
  };

  // If logtray variables are not in DB, ensure they are
  DB.set('logtrayOpen', self.isOpen());
  DB.set('logtrayHeight', self.height());

  // Create 'open log tray' button and add SVG icon
  self.elements.toggleTray = crel('button', { 'id': 'mde-toggle-logtray', 'class': status });
  self.elements.toggleTray.innerHTML = self.icon.toggleTray;

  // Create log tray element and html escaped characters (icon)
  self.elements.tray = crel('div', { 'id': 'mde-logtray', 'class': self.status },
    self.elements.resizeTray = crel('button', {'id': 'mde-logtray-resize-bar'}),
    self.elements.logs = crel('div', {'id': 'mde-logs'})
  );
  self.elements.tray.querySelector('#mde-logtray-resize-bar').innerHTML = '&bull; &bull; &bull;';

  // Add elements to DOM
  crel(self.elements.controlbar, self.elements.toggleTray);
  crel(document.body, self.elements.tray);

  // Set tray height
  setTrayHeight(DB.get('logtrayHeight'));

  // Set listeners
  self.elements.toggleTray.addEventListener('click', (e) => toggleLogTray(DB.get('logtrayOpen')));
  self.elements.resizeTray.addEventListener('touchstart', (e) => resizeLogTray(e));
  self.elements.resizeTray.addEventListener('mousedown', (e) => resizeLogTray(e));
  window.addEventListener('resize', (e) => setTrayHeight(DB.get('logtrayHeight')));

  // Display logs
  window.console.log = (message) => {
    const { filePath, fileName, lineNumber } = tracer(new Error());
    displayLog({ message, filePath, fileName, lineNumber });
  };

  // Display error messages
  if (options.displayErrors === true) {
    window.onerror = (message, filePath, lineNumber) => {
      displayLog({ message, filePath, fileName, lineNumber, type: 'error' });
    };
  }

  // modify global

  function setTrayHeight(height) {
    // set min height to match resize button height
    const min = self.elements.controlbar.offsetHeight;

    // Set max height based on if reload button is displayed
    const max = window.innerHeight - (self.elements.controlbar.offsetHeight + 20);

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

  function displayLog({message, filePath, fileName, lineNumber, type = 'log'}) {
    const lastLogElement = self.elements.logs.lastChild || false;

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

    // Check whether to scroll tray to the bottom after displaying message
    // Scroll only if logtray is initially at the bottom
    const scrollToBottom = self.elements.logs.scrollHeight - self.elements.logs.scrollTop <= self.elements.logs.clientHeight + 1;

    // Check whether to increment last message amount or create a new message
    const lastLogMessage = typeof lastLogElement === 'object' ? lastLogElement.querySelector('.mde-log-message-full').innerHTML : null;
    const incrementLastMessage = self.elements.logs.children.length > 0 && lastLogMessage === message;

    // If this message matches the previous one, increment it.
    if (incrementLastMessage) {
      const lastLogAmount = lastLogElement.querySelector('.mde-log-amount').innerHTML || 1;
      lastLogElement.querySelector('.mde-log-amount').innerHTML = lastLogAmount + 1;
    // Otherwise create a new log message
    } else {
      const log = crel('div', { 'class': 'mde-log mde-log-type-' + type },
        crel('div', { 'class': 'mde-log-amount' }),
        crel('div', { 'class': 'mde-log-message-single' }, message),
        crel('a', { 'class': 'mde-log-trace', 'href': filePath, 'target': '_blank'}, fileName + ':' + lineNumber),
        crel('pre', { 'class': 'mde-log-message-full' })
      );

      log.querySelector('.mde-log-message-full').innerHTML = message;

      // Listen for toggling full message
      log.querySelector('.mde-log-message-single').addEventListener('click', (e) => {
        log.classList.toggle('mde-log-open');
      });

      // Append log to DOM
      crel(self.elements.logs, log);
    }
  }
}