var Resource = require("./Resource");
var DirectoryHasher = require("./DirectoryHasher");
var ProgramManager = require("./ProgramManager");
var WorkspaceManager = require("./WorkspaceManager");

class DefaultResourceFactory {
    constructor() {}
    create() {
        var resource = new Resource({
            directoryHasher: new DirectoryHasher(),
            workspaceManager: new WorkspaceManager(),
            programManager: new ProgramManager()
            });
        // console.log(resource);
        return resource;
    }
};

module.exports = DefaultResourceFactory;

