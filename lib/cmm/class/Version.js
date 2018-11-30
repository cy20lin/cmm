
class Version {
    constructor() {
        this._major = undefined;
        this._minor = undefined;
        this._tweak = undefined;
        this._tail = undefined;
    }
    isUndefined() {
        return (this._major) ? true : false;
    }
    fromString(s) {
        var ss = s.split("-", 2)[0];
        var head = ss[0];
        var tail = (ss.length > 1) ? ss[1] : undefined;
        var xs = head.split(".");
        var n = xs.length;
        this._tail = tail;
        // TODO: Check is valid or not.
        if (n > 2) {
            this._tweak = Number(xs[2]);
        }
        if (n > 1) {
            this._minor = Number(xs[1]);
        }
        if (n > 0) {
            this._major = Number(xs[0]);
        }
        return this;
    }
    toString() {
        var out = "";
        if (this._major === undefined) return out;
        out += this._major;
        if (this._minor === undefined) return out;
        out += this._minor;
        if (this._tweak === undefined) return out;
        out += this._tweak;
        if (this._tail === undefined) return out;
        out += "-" + this._tail;
        return out;
    }
};

module.exports = Version;
