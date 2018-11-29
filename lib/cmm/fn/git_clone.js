var object = {
    defaultConfig:{},
    name:"git-clone",
    descriptionf:"simply clone git meta info directory",
    version:"1.2",
    inplace:true,
    isConfigValid: function(config){
        return true;
    },
    sourceDirectoryState: function(src, config, meta) {
        // return "INVALID" | "UP_TO_DATE" | "UPDATE_NEEDED"
        return "UP_TO_DATE";
    },
    create: function(dst, config, metaInfo, src){
        // git clone -n <url> <dst>
        // git config uploadpack.allowReachableSHA1InWant true
        // git cat-file -e <commit>^{commit} 
        // git pull
        var url = config.url;
    },
    update: function(dst, config, metaInfo, src){
    },
    destinationDirectoryState: function(dst, config, metaInfo) {
        sh.exec("git", ["fetch", "--dry-run"]);
        // return "INVALID" | "UP_TO_DATE" | "UPDATE_NEEDED"
    },
    // TODO:
    // need a manager for managing external dependencies
    // maybe we could use dependency injection
    dependencies: [
        "git"
    ]
};

module.exports = object;
