
class _Key {
    constructor() {
        this._pressed = {};
        this.LEFT = 37;
        this.UP = 38;
        this.RIGHT = 39;
        this.DOWN = 40;
        this.CTRL = 17;
        this.SHIFT = 16;
    }


    isDown(keyCode) {
        return this._pressed[keyCode];
    }

    onKeydown(event) {
        this._pressed[event.keyCode] = true;
    }

    onKeyup(event) {
        delete this._pressed[event.keyCode];
    }

}

const Key = new _Key();
export default Key;


