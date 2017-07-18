function fetch(query) {
  return document.querySelector('#mde-'+query);
}

function query(elem, query) {
  return elem.querySelector(query);
}

function insert(html, elem, position = 'beforeend') {
  return elem.insertAdjacentHTML(position, html);
}

function containsClass(elem, cls) {
  return elem.classList.contains(cls);
}

function toggleClass(elem, cls, assert) {
  return elem.classList.toggle(cls, assert);
}

function getType(obj) {
  const type = ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  return Number.isNaN(obj) ? 'NaN': type;
}

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

function returnTraceFromError(error) {
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

function logtray(options, DB) {
  // Setup variables if not setup already
  DB.set('logtrayOpen', DB.get('logtrayOpen') || false);
  DB.set('logtrayHeight', DB.get('logtrayHeight') || window.innerHeight * 0.25);


  buildlogtrayButton();
  buildlogtray();
  window.console.log = (message) => {
    const trace = returnTraceFromError(new Error);
    log(message, trace);
  };

  if (options.logErrors === true) {
    window.onerror = (message, filePath, lineNumber) => {
      const fileName = filePath.replace(/^.*[\\\/]/, '');
      log(message, {fileName, filePath, lineNumber, isError: true});
    }
  }

  function buildlogtrayButton() {
    insert(`<button id="mde-open-logtray" class="mde ${state()}"></button>`, document.body);
    fetch('open-logtray').addEventListener('click', (e) => {
      open();
    }, false);
  }

  function buildlogtray() {
    insert(`<div id="mde-logtray" class="mde ${state()}">
          <button id="mde-resize-logtray" class="mde">···</button>
          <button id="mde-close-logtray" class="mde">—</button>
          <div id="mde-logs"></div>
        </div>`, document.body)

    setHeight(height());

    const closeButton  = fetch('close-logtray');
    const resizeButton = fetch('resize-logtray');

    window.addEventListener('resize', (e) => {
      setHeight(height());
    }, false);
    closeButton.addEventListener('click', (e) => {
      close();
    }, false);
    resizeButton.addEventListener('touchstart', (e) => {
      resizeButton.classList.add('pressed');
      resize(e);
      e.preventDefault();
    }, false);
    resizeButton.addEventListener('touchend', (e) => {
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
    minHeight = minHeight()
    maxHeight = maxHeight()
    height = returnInRange(height, minHeight, maxHeight);
    DB.set('logtrayHeight', height);
    fetch('logtray').style.height = height+'px';
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
    const startHeight = height;
    const startTouch  = touches(e)[0];
    const startScroll = scrollInfo(fetch('logs'));

    const onMove = (e) => {
      const distance = getDragDistance(startTouch, touches(e)[0]);
      const newHeight = startHeight+distance.y;
      this.setHeight(newHeight);

      if (startScroll.atBottom && distance.y < startScroll.top) {
        fetch('logs').scrollTop = fetch('logs').scrollHeight;
      }
    }

    const onEnd = (e) => {
      resizeButton.removeEventListener('touchmove', onMove, false);
      resizeButton.removeEventListener('touchend', onEnd, false);
    }

    const resizeButton = fetch('resize-logtray');
    resizeButton.addEventListener('touchmove', onMove, false);
    resizeButton.addEventListener('touchend', onEnd, false);
  }

  function log(message, trace) {
    const { filePath, fileName, lineNumber, isError } = trace;

    const initialScroll = scrollInfo(fetch('logs'));

    const logs = fetch('logs');
    const lastLog = logs.lastChild || false;
    const lastMessage = (lastLog) ? query(lastLog, '.message').innerText : false;

    const id = 'log-'+logs.children.length;
    const type = isError ? 'error' : getType(message);
    message = toString(message, type);

    if (message !== lastMessage) {
      insert('<div id="mde-'+id+'" class="log '+type+'">'
          +    '<div class="preview">'
          +        '<div class="stack"></div>'
          +        '<a class="trace" href="'+filePath+'" target="_blank">'+fileName+':'+lineNumber+'</a>'
          +        '<div class="message"></div>'
          +    '</div>'
          +    '<div class="full"></div>'
          +'</div>', logs);

      const submitted = fetch(id);

      query(submitted, '.preview .message').innerText = message;
      query(submitted, '.full').innerText = message;

      query(submitted, '.preview').addEventListener('click', (e) => {
        if (!containsClass(e.target, 'trace')) {
          const clickedLog = e.target.closest('.log');
          toggleClass(clickedLog, 'expand');
        }
      });
    } else {
      const stackSize = parseInt(query(lastLog, '.stack').innerText) || 1;
      query(lastLog, '.stack').innerText = stackSize+1;
    }

    if (initialScroll.atBottom) {
      logs.scrollTop = logs.scrollHeight;
    }
  }
}

module.exports = logtray;