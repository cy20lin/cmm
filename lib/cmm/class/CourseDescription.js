var CourseQuery = require("./CourseQuery");
var CourseOption = require("./CourseOption");

class CourseDescription {
    constructor(config) {
        this._config = config;
        this._query = new CourseQuery(config.name, config.version);
        this._option = new CourseOption(config.option);
    }

};

module.exports = CourseDescription;
