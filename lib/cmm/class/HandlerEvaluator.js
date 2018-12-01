var DefaultHandlerManagerFactory = require("./DefaultHandlerManagerFactory");
var HandlerId = require("./HandlerId");

class HandlerEvaluator {
    constructor() {
        this._handlerManager = new DefaultHandlerManagerFactory(this).create();
    }
    handle(id, option){
        var id_ = (id_ instanceof HandlerId) ? id : new HandlerId(id);
        var handler = this._handlerManager.get(id);
        // console.log(handler.handle);
        var result = handler.handle(option);
        console.log(result);
        return result;
    }
    evaluate(expr) {
        var argument = expr.length < 2 ? null: expr[1];
        return this.handle(expr[0], {
            source:[],
            destination:[],
            argument:argument
        });
    }
};

module.exports = HandlerEvaluator;

var e = new HandlerEvaluator();
var r = e.handle("download.dummy", {
    source:[],
    directory:[],
    argument:{}
});

e.evaluate(["download.dummy", {
    "url":"http://hostname/to/x.tar.gz"
}]);

e.handle("download.git",{
    
    source:[],
    destination:["/home/cy20lin/.cmm/cache/download.git/tmp/tmp-22478Sl2AQpRL9PmT"],
    argument:{
    "origin":"https://github.com/fmtlib/fmt",
    "commit":"3e75ad9822980e41bc591938f26548f24eb88907"
}});
console.log(e);
console.log(r);
