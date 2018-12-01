
class Version {
    constructor(s) {
        this._major = undefined;
        this._minor = undefined;
        this._tweak = undefined;
        this._tail = undefined;
        this.fromString(s);
    }
    isUndefined() {
        return (this._major) ? true : false;
    }
    fromString(s) {
        if (!s)
            return this;
        var ss = s.split("-", 2);
        var head = ss[0];
        var tail = (ss.length > 1) ? ss[1] : undefined;
        var xs = head.split(".");
        var n = xs.length;
        this._tail = tail;
        // TODO: Check is valid or not.
        if (head === "")
            return;
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
        out += "." + this._minor;
        if (this._tweak === undefined) return out;
        out += "." + this._tweak;
        if (this._tail === undefined) return out;
        out += "-" + this._tail;
        return out;
    }
};

// var x = new Version("1.2.3-asdfa-asdf");
// console.log(x);
// console.log(x.toString());

module.exports = Version;
