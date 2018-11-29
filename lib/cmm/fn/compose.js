var object = {
    name: "compose",
    version: "0.0.0",
    isConfigValid: function(manager, config) {
        var result = {
            status: 0,
            message: "Success"
        };
        var valid = false;
        var n = config[1].length;
        for (var i = 0; i < n; ++i) {
            var x = config[1][i];
            var fn = x[0];
            var config_ = x[1];
            if (manager.has(fn)) {
                result = manager.get(fn).isConfigValid(manager,config_);
                valid = (result.status === 0);
                if (!valid) {
                    return result;
                }
            } else {
                result.status = -1;
                result.message = "Error, fn not found.";
                return result;
            }
        }
        return result;
    },
    sourceDirectoryState: function(manager, config) {
        config[1]
    }
};
module.exports = object;
