var Version = require("./Version");

class HandlerId {
    constructor(name, version) {
        this._name = name ? name : "";
        this._version = new Version(version);
    }
    name() {
        return this._name;
    }
    version() {
        return this._version;
    }
    toString() {
        var v = this._version.toString();
        if (v !== "")
            v = "@" + v;
        return this._name + v;
    }
};


module.exports = HandlerId;

// var x = new HandlerId("asdf", "1.2.3");
// console.log(x.toString());
// x = new HandlerId("asdf", "");
// console.log(x.toString());
