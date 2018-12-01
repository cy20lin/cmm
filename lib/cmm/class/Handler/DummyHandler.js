var HandlerId = require("../HandlerId");
var HandlerOption = require("../HandlerOption");
var LambdaListParser = require("../LambdaListParser");
// var fs = require("fs-extra");
// var util = require("util");
var State = require("../State");
// var DirectoryHash = require("../DirectoryHash");

/*
  ["dummy",{
  "origin":"https://dummyhub.com/fmtlib/fmt"
  "commit":"3e75ad9822980e41bc591938f26548f24eb88907"
  }]
  ["invoke", ["dummy", {
  "source":["path/to/source"],
  "destination":["path/to/destination"],
  "argument":{
  "origin":"https://dummyhub.com/fmtlib/fmt"
  "commit":"3e75ad9822980e41bc591938f26548f24eb88907"
  }}]]
  [add, [1,2]]
*/

class DummyHandler {
    constructor(evaluator, resource) {
        this._evaluator = evaluator;
        this._resource = resource;
        this._dh = resource.directoryHasher();
        this._id = new HandlerId("download.dummy");
        this._ws = this._resource.workspaceManager().get("cache/" + this._id.toString());
    }
    id() {
        return this._id;
    }
    handle(option) {
        var dummy = this._dummy;
        // var o = new HandlerOption(option);
        var result;
        console.log("handle---------------------");
        console.log(option);
        result = Object.assign({},option,{
            result: true
        });
        return result;
    }
};

module.exports = DummyHandler;

// var o = new DummyHandlerOption(
//     {
//         "source":["/home/cy20lin/tmp/a"],
//         "destination":["/home/cy20lin/tmp/b"],
//         "argument":{
//             "origin":"https://dummyhub.com/fmtlib/fmt",
//             "commit":"3e75ad9822980e41bc591938f26548f24eb88907"
//         }
//     },
//     null
// );
// if ("")
// console.log(x);
