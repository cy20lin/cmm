#!/usr/bin/env node

'use strict';

var fs = require("fs-extra");
var path = require("path");
var yargs = require("yargs");
var argv = yargs
    .command("fn", "internal functions",
             function (yargs) {
                 var fnDir = "./lib/cmm/fn"
                 var fnFiles = fs.readdirSync(fnDir);
                 fnFiles.forEach(function(file){
                     var module_ = path.join(fnDir,file);
                     var name = path.basename(file,".js");
                     var obj = require("./" + module_);
                     yargs
                         .command(name,name,
                                  function(yargs) {
                                      yargs
                                          .option("src", {describe: "source dir"})
                                          .option("dst", {describe: "destination dir"})
                                          .option("config", {describe: "configs for command"})
                                          .option("config-file", {describe: "config file for command"});
                                  }
                                 ,
                                  function(argv) {
                                      obj.action(argv.src,argv.dst,argv.config);
                                  });
                 })
                 return yargs;
             },
             function (argv) {
                 console.log(argv);
             }
            )
    .help()
    .argv;

console.log(process.argv);
console.log(argv);
