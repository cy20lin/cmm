function ruleToEntries(rule) {
    var out = [];
    var key = "default";
    var value = [];
    var flush = function() {
        out.push([key,value]);
    };
    rule.forEach(function(x) {
        if (x.charAt(0) === "&") {
            flush();
            key = x;
            value = [];
            return;
        }
        value.push(x);
    });
    flush();
    return out;
}

function parseRule(rule) {
    var ff = ruleToEntries(rule);
    var keys = ["default", "&optional", "&rest"];
    var objectify = (obj, [k, v]) => ({ ...obj, [k]: v });
    return ff.filter(function(elem, index, arr) {
        var key = elem[0];
        return keys.includes(key) && ff.findIndex(function(elem2) {
            var key2 = elem2[0];
            return key === key2;
        }) === index;
    }).reduce(objectify, {});
}

var args = [1,2,3,4,5,5,6,7];

function parseList(fmt, args) {
    var lb = fmt["default"].length;
    var n = args.length;
    var i = 0;
    var j = 0;
    var out = {};
    if (lb > n)
        throw Error("Insufficient arguments");
    for (; i < lb; ++i) {
        out[fmt["default"][i]] = args[i];
    }
    if ("&optional" in fmt) {
        var m = fmt["&optional"].length;
        for (j = 0; j < m; ++i, ++j) {
            out[fmt["&optional"][j]] = i < n ? args[i] : undefined;
        }
    }
    if ("&rest" in fmt) {
        m = fmt["&rest"].length;
        for (j = 0; j < m; ++i, ++j) {
            out[fmt["&rest"][j]] = i < n ? args.slice(i) : [];
        }
    }
    return out;
}

class LambdaListParsesr {
    constructor() {
        this._rule = [];
    }
    setRule(rule) {
        this._rule = rule;
        this._format = parseRule(rule);
        console.log(this._format);
        return this;
    }
    parse(args) {
        return parseList(this._format, args);
    }
};

// var x = new LambdaListParsesr().setRule(["&optional", "a", "b", "&", "c"]).parse([1]);
// console.log(x);

module.exports = LambdaListParsesr;
