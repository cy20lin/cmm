
var git = require("./lib/cmm/utility/git.js");

var x = git.clone_without_checkout("https://github.com/cy20lin/sweet", "sweet");
console.log(x);
