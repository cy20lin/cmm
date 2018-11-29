class ComposeHandlerOption {
    constructor(option){
        this._option = option;
    }
    sourceDirectory() {
        return this._option.src;
    }
    destinationDirectory() {
        return this._option.dst;
    }
    config() {
        return this._option.config;
    }
    expressions() {
        return this._option.config;
    }
    expressionAt(i) {
        return this._option.config[i];
    }
    expressionCount() {
        return this._option.config.length;
    }
};

class ComposeHandler {
    constructor(evaluator, resourse) {
        this._evaluator = evaluator;
        this._resourse = resourse; 
    }
    id() {
        return new HandlerId("compose", "0.0.0");
    }
    handle(option) {
        var o = new ComposeHandlerOption(option);
        var n = o.expressionCount();
        var argsExtra_ = {};
        var result;
        for (i = 0; ++i; i < n) {
            var expr = o.expressionAt(i);
            var cmd = expr.command();
            var args = Object.assign({}, expr.option(), argsExtra_);
            result = this._evaluator.run(cmd, args);
            argsExtra_.src = result.dst;
        };
        return result;
    }
};
module.exports = ComposeHandler;
