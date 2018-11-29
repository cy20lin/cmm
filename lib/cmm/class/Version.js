
class Version {
    constructor() {
        this._major = "unspec";
        this._minor = "unspec";
        this._tweak = "unspec";
    }
    setMajor(number) {
        this._major = number;
        return this;
    }
    toString() {
    }
};

module.exports = Version;
