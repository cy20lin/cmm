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
    }
    isUpToDate() {
        return this._state === 16;
    }
    setUpToDate() {
        this._state = 16;
    }
    isGood() {
        return this._state > 0;
    }
    setGood() {
        this._state = 8;
    }
    isValid() {
        return this._state >= 0;
    }
    isExpired() {
        return this._state = 0;
    }
    setExpired() {
        this._state = 0;
    }
    isInvalid() {
        return this._state < 0;
    }
    setInvalid() {
        this._state = -16;
    }
};

module.exports = State;
