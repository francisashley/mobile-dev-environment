function toString(obj, type)  {
    switch (type) {
      case 'string':    return obj;
      case 'undefined': return 'undefined';
      case 'NaN':       return 'NaN';
      default:          return JSON.stringify(obj);
    }
  }

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

function returnTraceFromError(error) {
    // get relevant trace parts
    const bits = error.stack.split(":").slice(4,9);
    // clear redundant chars at start and end
    let first = bits[0];
    bits[0] = first.substring(first.indexOf('(')+1,first.length);
    let last = bits[bits.length-1];
    bits[bits.length-1] = last.substring(0, last.indexOf(')'));
    // compile
    const fileName = bits[2].replace(/^.*[\\\/]/, '');
    return {
      fileName: fileName.length > 0 ? fileName : 'N/A',
      filePath: fileName.length > 0 ? bits[0]+':'+bits[1]+':'+bits[2] : '',
      lineNumber: bits[3]
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