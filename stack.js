class StackADT {

    /**
     * Stack ADT constructor.
     */
    constructor() {
        this.store = [];
        this.length = 0;
    }

    /**
     * Stack ADT push operation. Allows multi-insert.
     * @param vs
     */
    push(...vs) {
        vs.forEach(v => { this.store[this.length] = v; this.length += 1; });
    }

    /**
     * Stack ADT pop operation.
     * @returns {*}
     */
    pop() {
        if (this.length === 0) { throw SyntaxError("Cannot pop from a zero-length stack."); }
        const out = this.store[this.length - 1];
        this.store = this.store.slice(0, this.length - 1);
        this.length -= 1;
        return out;
    }

    /**
     * Stack ADT peek operation. Allows introspecting the topmost value without removing it from the stack.
     * @returns {*, undefined}
     */
    peek() {
        return (this.length > 0) ? this.store[this.length - 1] : undefined;
    }
}

module.exports = {
    StackADT: StackADT
};