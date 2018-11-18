var fs = require("fs-extra");
var path = require("path");

var object = {
    // assumption
    // in_dir has something
    // out_dir has something
    version: "0.1",
    action: function(src, dst, config) {
        var prefix = "[fn.demo]";
        console.log(prefix+` src: ${src}`);
        console.log(prefix+` dst: ${dst}`);
        console.log(prefix+` config: ${config}`);
    }
};

module.exports = object;
