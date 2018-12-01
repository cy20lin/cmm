var ProgramManager = require("./ProgramManager");
var directoryHasher = require("./DirectoryHasher");
var WorkspaceManager = require("./WorkspaceManager");

class Resource {
    constructor(args) {
        this._directoryHasher = args.directoryHasher;
        this._programManager = args.programManager;
        this._workspaceManager = args.workspaceManager;
    }
    directoryHasher() {
        return this._directoryHasher;
    }
    programManager() {
        return this._programManager;
    }
    workspaceManager() {
        return this._workspaceManager;
    }
};

module.exports = Resource;
