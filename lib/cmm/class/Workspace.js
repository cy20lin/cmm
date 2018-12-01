var fs = require("fs-extra");
var path = require("path");
var isEmptyDir = require("empty-dir").isEmpty;
var util = require("util");
var tmp = require("tmp");

class Workspace {
    constructor(root) {
        // TODO:
        // Should have a way to verify the validity of `this._root` directory
        // Maybe a file with directory meta-information.
        // TODO:
        // Should introduce locking mechanisms to avoid synchronization problems.
        var root_ = root;
        if (!root) {
            throw Error("root should not be empty." + util.inspect(root));
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
        if (!fs.lstatSync(root).isDirectory()) {
            throw new Error("Root should be a directory.");
        }
        this._root = path.normalize(path.resolve(root));
    }
    getTmpDir(namespace, prefix) {
        var ns = namespace ? namespace : "tmp";
        var dir = path.join(this._root, ns);
        var option = {dir:dir};
        fs.ensureDirSync(dir);
        // if (prefix) option.prefix = prefix;
        option.keep = true;
        var x = tmp.dirSync(option);
        return x.name;
    }
    getDir(namespace, name) {
        var ns = namespace ? namespace : "dir";
        var dir = path.join(this._root, ns);
        if (name)
            dir = path.join(dir, name);
        fs.ensureDirSync(dir);
        return dir;
    }
};

module.exports = Workspace;
