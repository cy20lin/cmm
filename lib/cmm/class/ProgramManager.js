// var Error = require("error")
var ModuleEnvironment = require("./ModuleEnvironment");
var Program = require("./Program");

class ProgramManager {
    constructor(moduleEnvironment) {
        if (!moduleEnvironment) {
            var defaultModuleEnvironment
                = new ModuleEnvironment();
            defaultModuleEnvironment.setEnv(process.env);
            this._moduleEnvironment = defaultModuleEnvironment;
        } else {
            this._moduleEnvironment = moduleEnvironment;
        }
    }
    get(programQuery) {
        var q = programQuery;
        var path = this._moduleEnvironment.findBinary(q);
        if (q === "") {
            throw new Error("Empty executable path");
        }
        return new Program(path, this._moduleEnvironment.getEnv());
    }
};

module.exports = ProgramManager;
