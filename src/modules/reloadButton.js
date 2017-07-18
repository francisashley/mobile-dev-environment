class helpers
{
  getDB(key, group) {
    const DBkey = `mde-${group}-${key}`;
    return localStorage[DBkey] ? JSON.parse(localStorage[DBkey]) : null;
  }

  setDB(key, val, group) {
    const DBkey = `mde-${group}-${key}`;
    return localStorage[DBkey] = JSON.stringify(val);
  }

  setupDB(keyVals, group) {
    for (let key in keyVals) {
      const DBkey = `mde-${group}-${key}`;
      localStorage[DBkey] = JSON.stringify(keyVals[key]);
    }
  }

  fetch(query) {
    return document.querySelector('#mde-'+query);
  }

  query(elem, query) {
    return elem.querySelector(query);
  }

  insert(html, elem, position = 'beforeend') {
    return elem.insertAdjacentHTML(position, html);
  }

  containsClass(elem, cls) {
    return elem.classList.contains(cls);
  }

  toggleClass(elem, cls, assert) {
    return elem.classList.toggle(cls, assert);
  }

  getType(obj) {
    const type = ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    return Number.isNaN(obj) ? 'NaN': type;
  }

  toString(obj, type)  {
    switch (type) {
      case 'string':    return obj;
      case 'undefined': return 'undefined';
      case 'NaN':       return 'NaN';
      default:          return JSON.stringify(obj);
    }
  }

  touches(e) {
    return e.changedTouches;
  }

  getDragDistance(dragStart, dragEnd) {
    return {
      x: dragStart.pageX-dragEnd.pageX,
      y: dragStart.pageY-dragEnd.pageY
    }
  }

  returnInRange(num, min, max) {
    num  = num > max ? max : num;
    return num < min ? min : num;
  }

  scrollInfo(elem) {
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

  returnTraceFromError(error) {
    // get relevant trace parts
    const bits = error.stack.split(":").slice(4,9)
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
}

class reload extends helpers
{
  constructor(options) {
    super();

    const { insert, fetch } = this;
    const { hardReload } = options;

    insert('<button id="mde-reload" class="mde"></button>', document.body);
    fetch('reload').addEventListener('click', (e) => {
      location.reload(hardReload)
    }, false);
  }
}

module.exports = reload;