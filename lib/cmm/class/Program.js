var cp = require("child_process");

class Program {
    constructor(exe, env) {
        this._exe = exe;
        this._env = env;
    }
    exec(args,options) {
        var env_ = {};
        try {
            env_ = Object.assign({}, this._env, options.env);
        } catch(e) {}
        var options_ = Object.assign({},options);
        options_.env = env_;
        return cp.spawnSync(this._exe, args, options);
    }
};

module.exports = Program;
