var semver = require("semver");

class EntryFinder {
    constructor(spec) {
        this._name = spec.name;
        this._version = spec.version;
        this._hash = spec.hash;
    }
    isMatchDefault(entry) {
        var result = false;
        // is case insensitive exactly match
        if (entry.name) {
            if (entry.name.toLowerCase() !== this._name.toLowerCase())
                return false;
        }
        if (entry.version) {
            if (!semver.satisfies(entry.version))
                return false;
        }
        if (entry.hash) {
            if (this._hash.startsWith(entry.hash)) {
                return true;
            }
            return false;
        }
        return true;
    }
};

class LocalRegistry {
    constructor(entries) {
        this._entries = entries ? entries : [];
    }
    load(entries) {
        this._entries = entries;
    }
    save(entry) {
    }
    register(entry) {
    }
    find(spec) {
        var finder = new EntryFinder(spec);
        this._entries.find(function(x){
            return finder.isMatchDefault(x);
        });
    }
};
