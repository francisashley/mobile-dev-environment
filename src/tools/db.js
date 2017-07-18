module.exports = function DB(group = 'global') {
    // share state information with other instances of mde
    // for seamless use across multiple client pages
    this._group = group;

    // prepare key: {mde-group-key}
    this._getKey = (key) => `mde-${this._group}-${key}`;

    // retrieve data
    this.get = function(key) {
        let result = localStorage[this._getKey(key)];
        return typeof result !== 'undefined' ? JSON.parse(result) : null;
    };

    // set data
    this.set = function(key, value) {
        return localStorage[this._getKey(key)] = JSON.stringify(value);
    };
};