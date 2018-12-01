class State {
    constructor(s) {
        switch(s) {
        case "UP_TO_DATE":
            this.setUpToDate();
            break;
        case "EXPIRED":
            this.setExpired();
            break;
        case "GOOD":
            this.setGood();
            break;
        case "VALID":
            this.setExpired();
            break;
        case "INVALID":
        default:
            this.setInvalid();
            break;
        }
        this._state = -16;
        this._message = "";
    }
    setMessage(msg) {
        this._message = msg;
        return this;
    }
    getMessage() {
        return this._message;
    }
    isUpToDate() {
        return this._state === 16;
    }
    setUpToDate() {
        this._state = 16;
        return this;
    }
    isGood() {
        return this._state === 8;
    }
    setGood() {
        this._state = 8;
        return this;
    }
    isEmpty() {
        return this._state === 0;
    }
    setEmpty() {
        this._state = 0;
        return this;
    }
    isValid() {
        return this._state >= 0;
    }
    isExpired() {
        return this._state === 4;
    }
    setExpired() {
        this._state = 4;
        return this;
    }
    isInvalid() {
        return this._state < 0;
    }
    setInvalid() {
        this._state = -16;
        return this;
    }
    toString() {
        switch (this._state) {
        case 16: return "UP_TO_DATE";
        case 8: return "GOOD";
        case 4: return "EXPIRED";
        case 0: return "EMPTY";
        default: return "INVALID";
        }
    }
};

module.exports = State;
