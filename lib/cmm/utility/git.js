var fs = require("fs-extra");
var cp = require("child_process");
var sh = require("shelljs");

function run(command, args) {
    return cp.spawnSync(command,args,{
        cwd: process.cwd(),
        env: process.env,
        stdio: [process.stdin, process.stdout, process.stderr],
        encoding: 'utf-8'
    });
}

function git_clone_without_checkout(url, dst) {
    // git clone -n <url> <dst>
    // var result = cp.execFileSync("git",["clone","-n",url,dst]);
    // var result = cp.spawnSync("git",["clone","-n",url,dst]);
    // console.log(result);
    var result = run("git",["clone","-n",url,dst]);
    return result.status === 0;
}

function git_checkout_specific_commit(repo, commit) {
    // git fetch --depth 1 /root/kernel/kernel $(cd /root/kernel/kernel 1>/dev/null 2>/dev/null ; uname -r | cut -d- -f3 | tail -c +2 | xargs git rev-parse )
    // git fetch --depth 1 /root/kernel/kernel $(cd /root/kernel/kernel 1>/dev/null 2>/dev/null ; uname -r | cut -d- -f3 | tail -c +2 | xargs git rev-parse )
    run("git",["fetch", "--depth", "1", repo, commit]);
}

function git_get_full_sha1(sha) {
    // git rev-prase $sha^{commit}
    var result = cp.execSync("git",["rev-parse",sha+"^{commit}"]);
}

function git_allow_reachable_sha1_in_want() {
    // git config uploadpack.allowReachableSHA1InWant true
    var result = cp.execFileSync("git",["config", "uploadpack.allowReachableSHA1InWant", "true"]);
}

function git_is_valid_non_bare_repo() {
    // git rev-parse --is-inside-work-tree
}

function git_remote_origin_up_to_date() {
    // git remote show origin | tail -n 1 | grep "local out of date"
}

var object = {
    clone_without_checkout: git_clone_without_checkout,
    is_remote_origin_up_to_date: git_remote_origin_up_to_date,
    is_valid_non_bare_repo: git_is_valid_non_bare_repo,
    allow_reachable_sha1_in_want: git_allow_reachable_sha1_in_want,
    checkout_specific_commit: git_checkout_specific_commit
};

module.exports = object;
