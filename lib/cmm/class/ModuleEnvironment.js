var fs = require("fs-extra");
var _ = require("lodash");
var path = require("path");

class ModuleEnvironment {
    constructor(parent) {
        if (parent) this._parent = parent;
        this._env = {};
        this._prefixes = [];
    }
    setEnv(env) {
        this._env = env;
    }
    getEnv() {
        return this._env;
    }
    addPrefixes(prefixes) {
        this._prefixes = this._prefixes.concat(prefixes);
    }
    _getPathes() {
        var result;
        try {
            result = this._env.PATH.split(path.delimiter);
        } catch (error) {
            result = [];
        }
        return result;
    }
    findBinary(name) {
        var r;
        this._prefixes.find(function(prefix){
            var file = path.join(prefix, "bin", name);
            var exists = fs.existsSync(file);
            r = file;
            return exists;
        });
        if (r) {
            return r;
        }
        this._getPathes().find(function(path_){
            var file = path.join(path_, name);
            var exists = fs.existsSync(file);
            r = file;
            return exists;
        });
        return r;
    }
    findProgram(name) {
        return this.findBinary(name);
    }
    newEnviroment() {
        return new ModuleEnvironment(this);
    }
};

module.exports = ModuleEnvironment;
