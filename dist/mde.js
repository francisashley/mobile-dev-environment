class MobileDevEnvironment
{
    constructor({reload=true, hardReload=true, logbox=true, logErrors=true, group='global'}={}) {
        if (reload === true) {
            this.reload = new MDEReload({hardReload});
        }
        if (logbox === true) {
            this.logbox = new MDELogbox({reload, logErrors, group});
        }
    }
}

class MDEHelpers
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

class MDEReload extends MDEHelpers
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

class MDELogbox extends MDEHelpers
{
    constructor(options) {
        super();
        
        this.options = options;
        
        const { setupDB, getDB } = this;
        
        setupDB({
            logboxOpen: getDB('logboxOpen', options.group ) || false,
            logboxHeight: getDB('logboxHeight', options.group) || 40
        }, options.group);
        
        this.buildLogboxButton();
        this.buildLogbox();
        
        window.console.log = (message) => {
            const trace = this.returnTraceFromError(new Error);
            this.log(message, trace);
        };
        
        if (options.logErrors === true) {
            window.onerror = (message, filePath, lineNumber) => {
                const fileName = filePath.replace(/^.*[\\\/]/, '');
                this.log(message, {fileName, filePath, lineNumber, isError: true});
            }
        }
    }
    
    buildLogboxButton() {
        const { state, insert, fetch } = this;
        insert(`<button id="mde-open-logbox" class="mde ${state}"></button>`, document.body);
        fetch('open-logbox').addEventListener('click', (e) => {
            this.open();
        }, false);
    }
    
    buildLogbox() {
        const { state, height, insert, fetch, drag } = this;
        
        insert(`<div id="mde-logbox" class="mde ${state}">
                    <button id="mde-resize-logbox" class="mde">···</button>
                    <button id="mde-close-logbox" class="mde">—</button>
                    <div id="mde-logs"></div>
                </div>`, document.body)
                
        this.setHeight(height);
        
        const closeButton  = fetch('close-logbox');
        const resizeButton = fetch('resize-logbox');
        
        window.addEventListener('resize', (e) => {
            this.setHeight(this.height);
        }, false);
        closeButton.addEventListener('click', (e) => {
            this.close();
        }, false);
        resizeButton.addEventListener('touchstart', (e) => {
            resizeButton.classList.add('pressed');
            this.resize(e);
            e.preventDefault();
        }, false);
        resizeButton.addEventListener('touchend', (e) => {
            resizeButton.classList.remove('pressed');
        }, false);
    }
    
    // constants
    
    get state() {
        const { options } = this;
        return this.getDB('logboxOpen', options.group);
    }
    
    get height() {
        const { options } = this;
        return this.getDB('logboxHeight', options.group);
    }
    
    get minHeight() {
        return this.fetch('resize-logbox').offsetHeight;
    }
    
    get maxHeight() {
        const { fetch, options } = this;
        return window.innerHeight - (options.reload ? fetch('reload').offsetHeight + 20 : 10);
    }
    
    // modify global
    
    setHeight(height) {
        const { setDB, fetch, minHeight, maxHeight, returnInRange, options } = this;
        height = returnInRange(height, minHeight, maxHeight);
        setDB('logboxHeight', height, options.group);
        fetch('logbox').style.height = height+'px';
    }
    
    // actions
    
    open() {
        const { fetch, setDB, options } = this;
        setDB('logboxOpen', true, options.group);
        fetch('open-logbox').classList = true;
        fetch('logbox').classList = true;
    }
    
    close() {
        const { fetch, setDB, options } = this;
        setDB('logboxOpen', false, options.group);
        fetch('open-logbox').classList = false;
        fetch('logbox').classList = false;
    }
    
    resize(e) {
        const { height, fetch, touches, scrollInfo, getDragDistance } = this;
        
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
        
        const resizeButton = fetch('resize-logbox');
        resizeButton.addEventListener('touchmove', onMove, false);
        resizeButton.addEventListener('touchend', onEnd, false);
    }

    log(message, trace) {
        const { filePath, fileName, lineNumber, isError } = trace;
        const { scrollInfo, fetch, insert, getType, toString, query, containsClass, toggleClass } = this;
        
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

            const submitted = this.fetch(id);
     
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