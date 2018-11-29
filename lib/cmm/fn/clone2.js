
var fs = require("fs-extra");
var sha256 = require("crypto-js/sha256");

var object = {
    name:"clone",
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
    destinationDirectory: function(dst,config,meta) {
        // "UP_TO_DATE" | "UPDATE_NEEDED" | "INVALID"
        return "UP_TO_DATE";
    },
    update: function(src,dst,config,meta) {
        
    }
};

module.exports = object;
