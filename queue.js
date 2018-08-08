const assert = require('assert');


class QueueADT {
    constructor() {
        this.store = [];
        this.length = 0;
    }

    enqueue(v) {
        this.store.push(v);
        this.length += 1;
    }

    dequeue() {
        if (this.length === 0) {
            throw SyntaxError("Cannot dequeue from a zero-length queue.")
        }

        let out = this.store[this.length - 1];
        this.length -= 1;
        this.store = this.store.slice(0, this.length - 1);
        return out;
    }

    front() {
        if (this.length === 0) {
            throw SyntaxError("Cannot peek at a zero-length queue.")
        } else {
            return this.store[0];
        }
    }

    back() {
        if (this.length === 0) {
            throw SyntaxError("Cannot peek at a zero-length queue.")
        } else {
            return this.store[this.length - 1];
        }
    }

    empty() {
        return (this.length === 0);
    }
}

module.exports = {
    QueueADT: QueueADT
};