class HandlerOption {
    constructor() {
        this._source = [];
        this._destination = [];
        this._argument = {};
    }
    setSource(source) {
        if (typeof source === "string") {
            this._source = [source];
        } else {
            this._source = source;
        }
        return this;
    }
    setDestination(destination) {
        if (typeof source === "string") {
            this._source = [destination];
        } else {
            this._source = destination;
        }
        return this;
    }
    source() {
        return this._source;
    }
    destination() {
        return this._destination;
    }
    argument() {
        return this._argument;
    }
    setArgument(argument) {
        this._argument = argument;
        return this;
    }
    fromObject(o) {
        if (o.source) this.setSource(o.source);
        if (o.destination) this.setDestination(o.destination);
        if (o.argument) this.setArgument(o.argument);
        return this;
    }
    toObject() {
        return {
            source: this.source(),
            destination: this.destination(),
            argument: this.argument()
        };
    }
};

module.exports = HandlerOption;
