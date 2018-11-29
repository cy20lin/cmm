
var object = {
    name:"example",
    version: "0.1",
    isInplace: false, // true | false
    defaultConfig:{},
    isConfigValid: function(config) {
        return true; // true | false
    },
    sourceDirectoryState: function(src,config,meta) {
        // "UP_TO_DATE" | "UPDATE_NEEDED" | "INVALID"
        return "UP_TO_DATE";
    },
    destinationDirectoryState: function(dst,config,meta) {
        // "UP_TO_DATE" | "UPDATE_NEEDED" | "INVALID"
        return "UP_TO_DATE";
    },
    update: function(src,dst,config,meta) {
    }
};

module.exports = object;
