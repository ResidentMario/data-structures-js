class ListADT {

    /**
     * List ADT constructor.
     * @constructor
     */
    constructor(vs=[]) {
        this.store = vs;
        this.length = vs.length;
    }

    /**
     * List ADT append operator.
     * @param v - The element to be stored.
     */
    append(v) {
        this.store[this.length] = v;
        this.length += 1;
    }

    /**
     * List ADT find operator.
     * @param v - The element to be found.
     */
    find(v) {
        let idx = 0;
        while (this.store[idx] !== v) {
            idx += 1;
            if (idx > this.length) { idx = -1; break; }
        }
        return idx;
    }

    /**
     * List ADT remove operator.
     * @param v - The element to be removed.
     */
    remove(v) {
        const idx = this.find(v);
        if (idx === -1) { return -1; }
        this.store = this.store.slice(0, idx).concat(this.store.slice(idx + 1));
        this.length -= 1;
        return idx;
    }

    /**
     * List ADT insert operator.
     * @param v - The element to be inserted.
     * @param idx - The index after which the element will appear. To insert in the first index, use -1.
     */
    insert(v, idx) {
        if (idx >= this.length) { throw SyntaxError("The given position is out of bounds."); }
        this.store = this.store.slice(0, idx + 1).concat([v]).concat(this.store.slice(idx + 1));
        this.length += 1;
    }

    /**
     * List ADT clear operator.
     */
    clear() {
        this.store = [];
        this.length = 0;
    }

    /**
     * List ADT iterator operator.
     */
    iter() {
        let _iter = null;
        (() => {
            class IteratorADT {
                constructor(vs) { this.store = vs; this.idx = 0; }
                next() {
                    if (this.idx >= this.store.length) {
                        return {done: true}
                    } else {
                        const out = this.store[this.idx];
                        this.idx += 1;
                        return {value: out, done: false };
                    }
                }
            }

            _iter = new IteratorADT(this.store);
        })();

        return _iter;
    }

}

module.exports = {
    ListADT: ListADT
};