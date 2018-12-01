var Workspace = require("./Workspace");
var fs = require("fs-extra");
var path = require("path");
var isEmptyDir = require("empty-dir").isEmpty;
var util = require("util");
var os = require("os");
var tmp = require("tmp");

class WorkspaceManager {
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
        this._setRoot(root_);
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
    root() {
        return this._root;
    }
    get(namespace,option) {
        var dirPath = this._toPath(namespace);
        fs.ensureDirSync(dirPath);
        if (!fs.lstatSync(dirPath).isDirectory()) {
            throw new Error("dirPath should be a directory." + util.inspect(dirPath));
        }
        return new Workspace(dirPath);
    }
    _toPath(namespace) {
        return path.join(this._root, namespace);
    }
};

module.exports = WorkspaceManager;

// var x = new WorkspaceManager();
// console.log(x);
