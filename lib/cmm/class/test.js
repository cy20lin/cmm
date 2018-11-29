const assert = require('assert');

// var Environment = require("./ModuleEnvironment");
// var Program = require("./Program");

// var e = new Environment();
// var exe;
// var path;
// exe = e.findProgram("sh");
// console.log(exe);
// e.setEnv(process.env);
// assert(typeof exe === "undefined");
// exe = e.findProgram("echo");
// console.log(exe);
// var exec = require("sync-exec");
// // var r = exec("/bin/ls");
// // console.log(r);

// // var pj = new Program("/bin/echo");
// var pg = new Program("echo");

// console.log(pg.exec(["hello world"]).stdout.toString());

// // exe
// // assert(exe === "/bin/sh");
// // e._getPathes();

// // console.log(`git: ${git}`);
// // var exe = e.findProgram("sh");
// // console.log(path);

// var GitProgram = require("./GitProgram");
// var git_path = e.findProgram("git");
// var git_ = new Program(git_path);
// var git = new GitProgram(git_);


// // console.log(git_.exec(["--version"]).stdout.toString().split(" ")[2]);
// console.log(git);
// console.log(git.version());
// console.log(git_.exec(["--version"]).stdout.toString());

// var crypto = require("crypto");
// const hashes = crypto.getHashes();
// console.log(hashes); // ['DSA', 'DSA-SHA', 'DSA-SHA1', ...]
var TestGitProgram = require("./TestGitProgram");
var testGitProgram = new TestGitProgram();
var testResult = testGitProgram.test();
console.log(`testResult: ${testResult}`);
