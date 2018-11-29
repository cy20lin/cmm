
function FnFactory(manager, options) {
    this.options = options;
    this.manager = manager;
    this.action = function(src,dst,config,meta){
        var r = {};
        var o = this.object;
        if (!o.isConfigValid(config)) {
            r.state = "INVALID";
            r.status = -1;
            r.message = "Invalid config.";
            return r;
        }
        var dstState = o.destinationDirectoryState();
        if (dstState === "INVALID") {
            r.state = "INVALID";
            r.status = -1;
            r.message = "Destination directory invalid.";
            return r;
        } else if (dstState === "UP_TO_DATE") {
            r.state = "UP_TO_DATE";
            r.status = 0;
            r.message = "Destination directory is up to date, use cache.";
            return 0;
        } else if (dstState === "UPDATE_NEEDED") {
            // return o.update(dst,config,meta,src);
            if (!o.isInplace()) {
                var srcState = o.sourceDirectoryState(src,config,meta);
                if (srcState === "UPDATE_NEEDED") {
                    r.state = "UPDATE_NEEDED";
                    r.status = -2;
                    r.message = "Update is needed form upstream source directory";
                    return 1;
                } else if (srcState === "INVALID") {
                    r.state = "INVALID";
                    r.status = -1;
                    r.message = "Source directory is invalid.";
                    return -2;
                } else if (srcState !== "UP_TO_DATE") {
                    r.state = "INVALID";
                    r.message = "Source directory has invalid state";
                    r.status = -1;
                }
                var x = o.update(src,dst,config,meta);
                r.status = x.status;
                r.state = x.status === 0 ? "UP_TO_DATE" : "INVALID";
                r.message = typeof x.message === "String" ? x.message : r.state;
                r.meta = x.meta;
            }
        } else {
            r.state = "INVALID";
            r.message = "Source directory has invalid state";
            r.status = -1;
        }
        return r;
    };
    this.defaultPath = function() {
    };
}
var object = {

};
function getFnFiles() {
    
}

function loadFn() {
}
