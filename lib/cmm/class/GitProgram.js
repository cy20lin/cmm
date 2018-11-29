var fs = require("fs-extra");
var path = require("path");
var isEmptyDir = require("empty-dir").isEmpty;
var Program = require("./Program");

class GitProgram {
    constructor(program) {
        Object.assign(this, program);
        this._super = program;
        this.exec = this._super.exec;
        // super(exe,env);
    }
    version() {
        try {
            return this.exec(["--version"]).stdout.toString().split("\n")[0].split(" ")[2];
        } catch (e) {
            return "";
        }
    }
    cloneWithoutCheckout(dir, from) {
        var x = this.exec(["clone", "-n", from, dir]);
        console.log(x.stdout.toString());
        return x.status === 0;
    }
    cloneAndCheckout(dir, from, commit) {
        return this.cloneWithoutCheckout(dir, from) && this.checkout(dir, commit);
    }
    isOnCommit(dir, commit) {
        return this.getHash(dir) === this.getHash(dir, commit);
    }
    isRemoteOriginUpToDate(dir) {
        var x = this.exec(["remote", "show", "origin"], {cwd:dir});
        if (x.status === 0) {
            var lines = x.stdout.toString().split("\n");
            var last;
            if (lines.length === 0)
                return false;
            if (lines[lines.length-1].length === 0)
                lines.pop();
            last = lines[lines.length-1];
            return last.endsWith("(up to date)");
        } else {
            return false;
        }
    }
    getRemoteOriginUrl(dir){
        var x;
        x = this.exec(["git remote get-url origin"],{cwd:dir});
        if (x.status === 0)
            return x.stdout.toString().split("\n")[0];
        return "";
    }
    rootDir(dir) {
        var x = this.exec(["rev-parse", "--git-dir"], {cwd:dir});
        var dir_ = "";
        if (x.status === 0) {
            dir_ = x.stdout.toString();
            dir_ = path.resolve(dir_);
            dir_ = path.normalize(dir_);
        }
        return dir_;
    }
    isValidNonBareRepoRoot(dir) {
        if (fs.existsSync(dir))
            return false;
        var dir_ = path.normalize(path.resolve(dir));
        var root = this.rootDir(dir);
        if (dir_ !== root)
            return false;
        var x = this.exec(["rev-parse", "--is-inside-work-tree"], {cwd:dir});
        if (x.status !== 0)
            return false;
        return true;
    }
    setAllowReachableSha1InWant() {
        var x = this.exec(["config", "uploadpack.allowReachableSHA1InWant"], {cwd:dir});
        return x.status === 0;
    }
    checkout(dir, commit) {
        var x = this.exec(["checkout", commit], {cwd:dir});
        return x.status === 0;
    }
    checkoutRemoteCommit(dir, commit) {
        var x = this.exec(["checkout", commit], {cwd:dir});
        return x.status === 0;
    }
    fetchRemoteCommit(dir, from, commit) {
        var x;
        x = this.exec(["fetch", "--depth", "1", from, commit], {cwd:dir});
        return x.status === 0;
    }
    checkoutRemoteCommit(dir, from, commit) {
        return this.fetchRemoteCommit(dir, from, commit)
            && this.checkoutFetchHead(dir);
    }
    checkoutFetchHead(dir) {
        return this.checkout(dir, "FETCH_HEAD");
    }
    hasCommit(dir, commit) {
        // FIXME: This is not precise
        return this.exec(["cat-file", "-e", commit + "^{commit}"],{cwd:dir}).status === 0;
    }
    canResolveToCommit(dir, object) {
        return this.exec(["cat-file", "-e", object + "^{commit}"],{cwd:dir}).status === 0;
    }
    checkoutFrom(dir, from, commit) {
        var x;
        if (!fs.existsSync(dir)) {
            fs.ensureDirSync(dir);
        }
        if (isEmptyDir(dir)) {
            if (this.init(dir) && this.checkoutRemoteCommit(dir,from,commit)) {
                return true;
            } else if (this.cloneAndCheckout(dir,from,commit)){
                return true;
            }
            return false;
        } else if (this.isValidNonBareRepoRoot(dir)) {
            if (this.hasCommit(dir, commit)) {
                if (!this.onCommit(dir, commit)) {
                    return this.checkout(dir, commit);
                }
                return true;
            } else if(!this.isRemoteOriginUpToDate()) {
                return this.pullOrigin(dir,"origin")
                    && this.checkout(dir,from,commit);
            }
            return false;
        }
        return false;
    }
    pullOrigin(dir) {
        var x = this.exec(["pull"],{cwd:dir});
        return x.status === 0;
    }
    getHash(dir, ref) {
        var x;
        if (!ref || ref === "") {
            x = this.exec(["rev-parse", "HEAD"], {cwd:dir});
            return x.stdout.toString();
        }
        x = this.exec(["rev-parse", ref], {cwd:dir});
        return x.stdout.toString();
    }
    init(dir) {
        var x = this.exec(["init"],{cwd:dir});
        return x.status === 0;
    }
}

module.exports = GitProgram;
