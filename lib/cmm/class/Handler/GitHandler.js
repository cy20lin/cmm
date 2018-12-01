var HandlerId = require("../HandlerId");
var GitProgram = require("../GitProgram");
var HandlerOption = require("../HandlerOption");
var LambdaListParser = require("../LambdaListParser");
var fs = require("fs-extra");
var util = require("util");
var State = require("../State");
// var DirectoryHash = require("../DirectoryHash");

/*
  ["git",{
  "origin":"https://github.com/fmtlib/fmt"
  "commit":"3e75ad9822980e41bc591938f26548f24eb88907"
  }]
  ["invoke", ["git", {
  "source":["path/to/source"],
  "destination":["path/to/destination"],
  "argument":{
  "origin":"https://github.com/fmtlib/fmt"
  "commit":"3e75ad9822980e41bc591938f26548f24eb88907"
  }}]]
  [add, [1,2]]
*/

class GitHandlerOption {
    constructor(option, workspace) {
        this._dst = new LambdaListParser().setRule(["&optional", "commit", "origin"]).parse(option.destination);
        this._origin = option.argument.origin;
        this._commit = option.argument.commit;
        this._originKey = this._origin.replace(/[^_0-9a-zA-Z.]/g,"@");
        this._commitKey = this._commit;
        this._workspace = workspace;
        this._originDir = this._dst.origin
            ? this._dst.origin
            : this._workspace.getDir("repository", this.getOriginKey());
        this._commitDir = this._dst.commit
            ? this._dst.commit
            : this._workspace.getTmpDir("tmp", this.getCommitKey());
    }
    getOrigin() {
        return this._origin;
    }
    getCommit() {
        return this._commit;
    }
    getOriginKey() {
        return this._originKey;
    }
    getCommitKey() {
        return this._commitKey;
    }
    getOriginDir() {
        return this._originDir;
    }
    getCommitDir() {
        return this._commitDir;
    }
};

function isEmptyDirectory(dir) {
    try {
        var files = fs.readdirSync(dir);
        return files.length === 0;
    } catch (e) {
        return false;
    }
}

class GitHandler {
    constructor(evaluator, resource) {
        this._evaluator = evaluator;
        this._resource = resource;
        this._directoryHasher = resource.directoryHasher();
        this._git = new GitProgram(resource.programManager().get("git"));
        this._id = new HandlerId("download.git");
        this._workspace = this._resource.workspaceManager().get("cache/" + this._id.toString());
    }
    _getCommitDirState(o) {
        var state = new State();
        var git = this._git;
        var dir = o.getCommitDir();
        console.log("[_getCommitDirState] (1)");
        if (!fs.lstatSync(dir).isDirectory()) {
            console.log("[_getCommitDirState] (2)");
            state.setInvalid();
            state.setMessage("Not a Directory, with path=" + util.inspect(dir));
            return state;
        }
        if (isEmptyDirectory(dir)) {
            console.log("[_getCommitDirState] (3)");
            state.setEmpty();
            return state;
        }
        if (!git.isValidNonBareRepoRoot(dir)) {
            console.log("[_getCommitDirState] (4)");
            state.setInvalid();
            state.setMessage("Not a valid git directory, with path=" + util.inspect(dir));
            return state;
        }
        var z = git.isOnRemoteOrigin(dir, o.getOrigin());
        if (!z) {
            console.log("[_getCommitDirState] (5)");
            console.log(z);
            state.setInvalid();
            // state.setMessage(`Directory ${util.inspect(dir)} has a different origin than specified.`
            //                  ` (with origin=${util.inspect(o.getOrigin())} , specified=${util.inspect(git.getOrigin(dir))})`);
            return state;
        }
        if (git.isOnCommit(dir, o.getCommit())) {
            console.log("[_getCommitDirState] (6)");
            state.setUpToDate();
            return state;
        }
        if (git.hasCommit()) {
            console.log("[_getCommitDirState] (7)");
            state.setGood();
            return state;
        }
        console.log("[_getCommitDirState] (8)");
        state.setExpired();
        return state;
    }
    _getOriginDirState(o) {
        var state = new State();
        var git = this._git;
        var dir = o.getOriginDir();
        if (!fs.lstatSync(dir).isDirectory()) {
            state.setInvalid();
            state.setMessage("Not a Directory, with path=" + util.inspect(dir));
            return state;
        }
        if (isEmptyDirectory(dir)) {
            state.setEmpty();
            return state;
        }
        if (!git.isValidNonBareRepoRoot(dir)) {
            state.setInvalid();
            state.setMessage("Not a valid git directory, with path=" + util.inspect(dir));
            return state;
        }
        if (!git.isOnRemoteOrigin(dir, o.getOrigin(dir))) {
            state.setInvalid();
            // state.setMessage(`Directory ${util.inspect(dir)} has a different origin than specified.`
            //                  ` (with origin=${util.inspect(o.getOrigin())} , specified=${util.inspect(git.getRemoteOriginUrl(dir))})`);
            return state;
        }
        if (git.hasCommit(dir,o.getCommit())) {
            if (git.isAllowReachableSha1InWant(dir))
                state.setUpToDate();
            else
                state.setGood();
            return state;
        } else if (git.isRemoteOriginUpToDate(dir)) {
            state.setInvalid();
            state.setMessage("Local repository is up-to-date but it doesn't have commit" + util.inspect(o.getCommit()));
            return state;
        }
        state.setExpired();
        return state;
    }
    id() {
        return this._id;
    }
    _setupOption(option) {
        var option_ = new HandlerOption().fromObject(option);
        return option_;
    }
    handle(option) {
        var git = this._git;
        var result;
        var option_ = Object.assign({
            source:[],
            destination:[],
            argument:undefined
        },option);
        console.log("---------------------------------------");
        console.log(option_);
        console.log(this._workspace);
        var o = new GitHandlerOption(option_, this._workspace);
        var commitDirState = this._getCommitDirState(o);
        var originDirState = this._getOriginDirState(o);
        var commitDir = o.getCommitDir();
        var originDir = o.getOriginDir();
        var commit = o.getCommit();
        var origin = o.getOrigin();
        var success = false;
        console.log("[GitHandler] (1)");
        do {
            if (commitDirState.isUpToDate()) {
                console.log("[GitHandler] (2)");
                success = true;
                break;
            }
            if (commitDirState.isGood()) {
                console.log("[GitHandler] (3)");
                // Local update to commit
                success = git.checkout(commitDir, commit);
                break;
            }
            if (commitDirState.isInvalid()) {
                console.log("[GitHandler] (4)");
                success = false;
                break;
            }
            if (originDirState.isInvalid()) {
                console.log("[GitHandler] (5)");
                success = false;
                break;
            }
            if (originDirState.isUpToDate()) {
                console.log("[GitHandler] (6)");
                if (commitDirState.isEmpty()) {
                    console.log("[GitHandler] (7)");
                    success = git.init(commitDir)
                        && git.addRemoteOriginUrl(commitDir, origin)
                        && git.fetchRemoteCommit(commitDir, originDir, commit)
                        && git.checkout(commitDir, commit);
                } else if (commitDirState.isExpired()) {
                    console.log("[GitHandler] (8)");
                    success = git.fetchRemoteCommit(commitDir, originDir, commit)
                        && git.checkout(commitDir, commit);
                }
                break;
            }
            if (originDirState.isGood()) {
                console.log("[GitHandler] (9)");
                if (commitDirState.isEmpty()) {
                    console.log("[GitHandler] (10)");
                    success = git.init(commitDir)
                        && git.addRemoteOriginUrl(commitDir, origin)
                        && git.setAllowReachableSha1InWant(originDir, true)
                        && git.fetchRemoteCommit(commitDir, originDir, commit)
                        && git.checkout(commitDir, commit);
                } else if (commitDirState.isExpired()) {
                    console.log("[GitHandler] (11)");
                    success = git.setAllowReachableSha1InWant(originDir,true)
                        && git.fetchRemoteCommit(commitDir, originDir, commit)
                        && git.checkout(commitDir, commit);
                }
                break;
            } else if (originDirState.isExpired()) {
                console.log("[GitHandler] (12)");
                if (commitDirState.isEmpty()) {
                    success = git.pullOrigin(originDir)
                        && git.init(commitDir)
                        && git.addRemoteOriginUrl(commitDir, origin)
                        && git.setAllowReachableSha1InWant(originDir, true)
                        && git.fetchRemoteCommit(commitDir, originDir, commit)
                        && git.checkout(commitDir, commit);
                } else if (commitDirState.isExpired()) {
                    success = git.pullOrigin(originDir)
                        && git.setAllowReachableSha1InWant(originDir, true)
                        && git.fetchRemoteCommit(commitDir, originDir, commit)
                        && git.checkout(commitDir, commit);
                }
                break;
            } else if (originDirState.isEmpty()) {
                console.log("[GitHandler] (13)");
                if (commitDirState.isEmpty()) {
                    success = git.cloneWithoutCheckout(originDir, origin)
                        && git.init(commitDir)
                        && git.addRemoteOriginUrl(commitDir, origin)
                        && git.setAllowReachableSha1InWant(originDir, true)
                        && git.fetchRemoteCommit(commitDir, originDir, commit)
                        && git.checkout(commitDir, commit);
                } else if (commitDirState.isExpired()) {
                    success = git.cloneWithoutCheckout(originDir, origin)
                        && git.setAllowReachableSha1InWant(originDir, true)
                        && git.fetchRemoteCommit(commitDir, originDir, commit)
                        && git.checkout(commitDir, commit);
                }
                break;
            }
        } while (false);
        console.log("[GitHandler] (14)");
        result = {
            source: [],
            destination: [o.getCommitDir(), o.getOriginDir()],
            state: [
                [commitDirState.toString(), commitDirState.getMessage()],
                [originDirState.toString(), originDirState.getMessage()]
            ],
            argument: {
                origin: o.getOrigin(),
                commit: o.getCommit()
            },
            result: {
                value: success
            }
        };
        console.log("##############");
        console.log(result);
        return result;
    }
};
module.exports = GitHandler;

// var o = new GitHandlerOption(
//     {
//         "source":["/home/cy20lin/tmp/a"],
//         "destination":["/home/cy20lin/tmp/b"],
//         "argument":{
//             "origin":"https://github.com/fmtlib/fmt",
//             "commit":"3e75ad9822980e41bc591938f26548f24eb88907"
//         }
//     },
//     null
// );
// if ("")
// console.log(x);
