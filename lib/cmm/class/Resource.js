var ProgramManager = require("./ProgramManager");
var WorkspaceManager = require("./WorkspaceManager");
var DirectoryManager = require("./DirectoryManager");

class Resource {
    constructor(args) {
        this._programManager = args.programManager;
        this._directoryManager = args.directoryManager;
        this._workspaceManager = args.workspaceManager;
    }
    programManager() {
        return this._programManager;
    }
    directoryManager() {
        return this._directoryManager;
    }
    workspaceManager() {
        return this._workspaceManager;
    }
};
