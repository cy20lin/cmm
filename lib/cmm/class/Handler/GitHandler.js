var HandlerId = require("../HandlerId");
var GitProgram = require("../GitProgram");
var HandlerOption = require("../HandlerOption");

class GitHandler {
    constructor(evaluator, resource) {
        this._evaluator = evaluator;
        this._resourse = resource; 
        this._dm = resource.directoryManager();
        this._git = new GitProgram(resource.programManager().get("git"));
        // this._defaultOption = {
        //     src:
        //     dst:
        //     config: {
        //         origin:
        //         commit:
        //     }
        // };
    }
    id() {
        return new HandlerId("git", "0.0.0");
    }
    handle(option) {
        var option_ = new HandlerOption().fromObject(option);
    }
    _getDir() {
    }
};
module.exports = GitHandler;
