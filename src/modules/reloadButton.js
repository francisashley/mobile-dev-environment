function reload(options) {
  // Libraries
  const crel = require('crel');
  // Elements
  self.elements = { reload: {} };

  crel(document.querySelector('#mde-controlbar'),
    self.elements.reload = crel('button', { 'id': 'mde-reload', 'class': 'mde' } )
  );

  // Add svg icon to button
  self.elements.reload.innerHTML  = '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/><path d="M0 0h24v24H0z" fill="none"/></svg>';

  self.elements.reload.addEventListener('click', (e) => {
    location.reload(options.hardReload);
  }, false);
}

module.exports = reload;