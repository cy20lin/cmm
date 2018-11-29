const fh = require('folder-hash');

class DirectoryHash {
    constructor(option) {
        var defaultOption = {
            algo: "sha256",
            encoding: "hex",
            folders: {
                execlude: [".git", ".cmm", ".svn"]
            }
        };
        this._option = option ? option : defaultOption;
    }
    hash(dir) {
        return fh.hashElement(dir,this._option).hash;
    }
};

module.export = DirectoryHash;
