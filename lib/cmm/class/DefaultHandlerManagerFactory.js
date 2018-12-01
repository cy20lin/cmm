var Resource = require("./Resource");
var DefaultResourceFactory = require("./DefaultResourceFactory");
var HandlerManager = require("./HandlerManager");

class DefaultHandlerManagerFactory {
    constructor(evaluator) {
        this._evaluator = evaluator;
        this._resource = new DefaultResourceFactory().create();
    }
    create(evaluator) {
        var Handler;
        var manager = new HandlerManager();
        var names = ["DummyHandler","GitHandler"];
        var handler;
        var evaluator_= evaluator ? evaluator : this._evaluator;
        var that = this;
        names.forEach(function(name) {
            Handler = require("./Handler/" + name);
            handler = new Handler(evaluator_, that._resource);
            manager.register(handler);
        });
        return manager;
    }
};

module.exports = DefaultHandlerManagerFactory;

