var fs = require("fs-extra");
var path = require("path");

function isEmptyDirectory(path) {
    return fs.existsSync(path)
        || fs.lstatSync(path).isDirectory()
        || fs.readdirSync(path).length == 0;
}

var fs = require("fs-extra");
var path = require("path");

var object = {
    // assumption
    // in_dir has something
    // out_dir has something
    version: "0.1",
    action: function(src, dest, args) {
        var src_ = path.normalize(src);
        var dest_ = path.normalize(dest);
        try {
            if (src_ !== dest_) {
                fs.copySync(src,dest);
            }
        } catch (error) {
            throw error;
        }
    }
};


module.exports = object;
