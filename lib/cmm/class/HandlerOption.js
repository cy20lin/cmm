class HandlerOption {
    constructor() {
        this._source = [];
        this._destination = [];
        this._config = {};
    }
    setSource(src) {
        if (typeof src === "string") {
            this._source = [src];
        } else {
            this._source = src;
        }
        return this;
    }
    setDestination(dst) {
        if (typeof src === "string") {
            this._source = [dst];
        } else {
            this._source = dst;
        }
        return this;
    }
    source() {
        return this._source;
    }
    destination() {
        return this._destination;
    }
    config() {
        return this._config;
    }
    setConfig(config) {
        this._config = config;
        return this;
    }
    fromObject(o) {
        if (o.src) this.setSource(o.src);
        if (o.dst) this.setDestination(o.dst);
        if (o.config) this.setConfig(o.config);
        return this;
    }
    toObject() {
        return {
            src: this.source(),
            dst: this.destination(),
            config: this.config()
        };
    }
};

module.exports = HandlerOption;
