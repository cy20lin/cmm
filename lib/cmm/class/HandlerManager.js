class HandlerManager {
    constructor() {
        this._map = {};
    }
    register(handler) {
        this._map[handler.id().toString()] = handler;
        return true;
    }
    get(handlerId) {
        return this._map[handlerId.toString()];
    }
};

module.exports = HandlerManager;
