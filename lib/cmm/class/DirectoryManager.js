var fs = require("fs-extra");
var path = require("path");
var isEmptyDir = require("empty-dir").isEmpty;
var util = require("util");
var Program = require("./Program");
var os = require("os");
var tmp = require("tmp");

// types of directory
// store: for long term storing
// cache: is good for user to delete,
// temporary: very short term usage, delete itself when execution terminated
class DirectoryManager {
    constructor(root) {
        // TODO:
        // Should have a way to verify the validity of `this._root` directory
        // Maybe a file with directory meta-information.
        // TODO:
        // Should introduce locking mechanisms to avoid synchronization problems.
        var root_ = root;
        if (!root) {
            root_ = path.join(os.homedir(), ".cmm");
        }
        this._setRoot(root);
    }
    _setRoot(root) {
        if (typeof root !== 'string') {
            throw new TypeError('Root must be a string. Received ' + util.inspect(root));
        } else if (root === "") {
            throw new Error("Root should not be empty string.");
        }
        fs.ensureDirSync(root);
        if (!fs.isDirectory(root)) {
            throw new Error("Root should be a directory.");
        }
        this._root = path.normalize(path.resolve(root));
    }
    root() {
        return this._root;
    }
    _tmpRoot() {
        return path.join(this.root(), "tmp");
    }
    _cacheRoot() {
        return path.join(this.root(), "cache");
    }
    _storeRoot() {
        return path.join(this.root(), "store");
    }
    _getTmp(id, hash) {
        var hash_ = hash.toString();
        var root = this._tmpRoot();
        var dirname = path.dirname(hash_);
        var prefix = path.basename(hash_);
        var dir = path.join(root, id.toString(), dirname);
        // TODO:
        // Check is hash is a valid path.
        // It should not begin with '/'
        fs.ensureDirSync(dir);
        var x = tmp.dirSync({dir:dir, prefix:prefix});
        return x.name;
    }
    _get(type, id, hash) {
        var hash_ = hash.toString();
        var root = this._tmpRoot();
        var dirname = path.dirname(hash_);
        var prefix = path.basename(hash_);
        var dir = path.join(root, type, id.toString(), dirname);
        var name = path.join(dir, prefix);
        // TODO:
        // Check is hash is a valid path.
        // It should not begin with '/'
        fs.ensureDirSync(name);
        return name;
    }
    get(type, id, hash) {
        switch(type) {
        case "tmp":
            return this._getTmp(id, hash);
        case "cache":
            return this._get(type, id, hash);
        case "store":
            return this._get(id, hash);
        }
        throw Error("Invalid directory type requested. Should be either 'tmp', 'cache', 'store'");
    }
};

module.exports = DirectoryManager;
