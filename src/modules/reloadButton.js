function touches(e) {
    return e.changedTouches;
  }

function getDragDistance(dragStart, dragEnd) {
    return {
      x: dragStart.pageX-dragEnd.pageX,
      y: dragStart.pageY-dragEnd.pageY
    };
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
    };
  }


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