#!/usr/bin/env node

// Grab provided args.
const [...args] = process.argv;

// Print hello world provided args.
console.log(args);
console.log(`Hello World ${process.argv}`);
let x = args;
console.log(`${x}`);

let http_fetcher = {
    fetch(option) {
        const {url, dryRun, directory, fileName, timeout} = option;
        console.log(url);
        console.log(dryRun);
        console.log(directory);
        return;
    }
};

http_fetcher.fetch({
    url:"https://github.com/cy20lin/a/a.zip",
    dryRun:true,
    directory:"."

})
