function reload(options) {
  // Libraries
  const crel = require('crel');
  // Elements
  self.elements = { reload: {} };

  crel(document.body,
    self.elements.reload = crel('button', { 'id': 'mde-reload', 'class': 'mde' } )
  );

  self.elements.reload.addEventListener('click', (e) => {
    location.reload(options.hardReload);
  }, false);
}

module.exports = reload;