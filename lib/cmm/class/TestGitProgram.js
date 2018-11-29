// var GitProgram = require("./GitProgram");
var assert = require("assert");
var Program = require("./Program");
var GitProgram = require("./GitProgram");
var ProgramManager = require("./ProgramManager");
var tmp = require("tmp");

tmp.setGracefulCleanup();

function tmpdir() {
    var tmpobj = tmp.dirSync({ mode: "0750", prefix: 'cmm_TestGitProgram_' });
    return tmpobj.name;
}

class TestGitProgram {
    constructor() {
        var pm = new ProgramManager();
        this._git = new GitProgram(pm.get("git"));
    }
    test() {
        var result = true;
        console.log("test_version");
        this.test_version();
        console.log("test_isValidNonBareRepoRoot");
        this.test_isValidNonBareRepoRoot();
        console.log("test_cloneWithoutCheckout");
        this.test_cloneWithoutCheckout();
        console.log("test_isRemoteOriginUpToDate");
        this.test_isRemoteOriginUpToDate();
        console.log("test_getHash");
        this.test_getHash();
        return result;
    }
    test_version() {
        var git = this._git;
        var version = git.version();
        try {
            if (typeof version !== "string")
                return false;
            // if (!(version === "" || version.match(/^[0-9]+(\.[0-9]){,2}.$/g)))
            //     return false;
            console.log(version);
        } catch (e) {
            return false;
        }
        return true;
    }
    test_cloneWithoutCheckout() {
        return true;
    }
    test_isValidNonBareRepoRoot() {
        return true;
    }
    test_isRemoteOriginUpToDate() {
        var git = this._git;
        var dir = this._tmpInit();
        this._tmpCommit(dir);
        var dir2 = tmpdir();
        var isUpToDate;
        git.exec(["clone", dir, dir2]);

        // Make origin up-to-date
        isUpToDate = git.isRemoteOriginUpToDate(dir2);
        assert.equal(isUpToDate, true);
        console.log(`isUpToDate: ${isUpToDate}`);

        this._tmpCommit(dir);

        // Make origin out-of-date
        isUpToDate = git.isRemoteOriginUpToDate(dir2);
        assert.equal(isUpToDate, false);
        console.log(`isUpToDate: ${isUpToDate}`);
    }
    _tmpInit() {
        var git = this._git;
        var dir = tmpdir();
        var r = git.exec(["init"],{cwd:dir});
        // console.log(r.stdout.toString());
        return dir;
    }
    _tmpCommit(dir) {
        var git = this._git;
        var f = tmp.fileSync({dir:dir});
        var x;
        x = git.exec(["add", "."],{cwd:dir});
        // console.log(x.stdout.toString());
        x = git.exec(["commit", "--allow-empty", "-m", f.name],{cwd:dir});
        // console.log(x.stdout.toString());
        x = git.exec(["rev-parse", "HEAD"],{cwd:dir});
        // console.log(x.stdout.toString());
        return x.stdout.toString();
    }
    test_getHash() {
        var git = this._git;
        var dir = this._tmpInit();
        var hash1 = git.getHash(dir);
        console.log(`  hash1: ${hash1}`);

        var commit = this._tmpCommit(dir);
        var hash2 = git.getHash(dir);
        console.log(`  hash2: ${hash2}`);
        assert.equal(commit, hash2);

        var commit2 = this._tmpCommit(dir);
    }
};

module.exports = TestGitProgram;
