class _Node {
    constructor(value, next=null) {
        this.value = value;
        this.next = next;
    }
}

class LinkedListADT {

    /**
     * Linked List ADT constructor.
     * @constructor
     */
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    append(v) {
        let n = new _Node(v);
        if (!this.head) {
            this.head = n;
            this.tail = n;
        } else {
            this.tail.next = n;
            this.tail = n;
        }
        this.length += 1;
    }

    _get_node(idx) {
        if (idx >= this.length || idx < 0) { throw SyntaxError("Attempting a get that is out of range."); }
        else if (idx === 0) { return this.head; }
        else if (idx === this.length - 1 ) { return this.tail; }
        else {
            // Iterate through, skipping the first node because we know we haven't hit that case.
            let c = 1;
            let n_p = this.head.next;
            while (c  < idx) {
                n_p = n_p.next;
            }
            return n_p;
        }
    }

    get(idx) {
        return this._get_node(idx).value;
    }

    /**
     * Linked list ADT insert operation.
     * @param v - The value to store.
     * @param idx - The index of the linked node to store the value at.
     */
    insert(v, idx) {
        if (idx > this.length || idx < 0) { throw SyntaxError("Attempting an insert that is out of range."); }

        if (idx === 0) {
            this.head = new _Node(v, this.head);
        } else if (idx === this.length) {
            let n_p = this.tail;
            let new_tail = new _Node(v);
            n_p.next = new_tail;
            this.tail = new_tail;
        } else {
            let n_p = this._get_node(idx - 1);
            let n_n = n_p.next;
            n_p.next = new _Node(v, n_n);
        }
        this.length += 1;

    }

}

module.exports = {
    LinkedListADT: LinkedListADT
};