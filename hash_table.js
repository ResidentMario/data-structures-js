// Hash table with linear probing and a trivial hash function.
class HashTableADT {

    constructor(length) { this.store = Array(length); this.length = length; }

    // Simple hash that uses the ASCII character codes for every character in the string representation of the value
    // to compute a hash.
    _hash1(v) {
        v = v.toString();
        let idx = null;
        let v_arr = [];
        let hash = 0;
        for (idx of Object.keys([...Array(v.length)])) {
            hash += v.charCodeAt(idx);
        }
        return hash % this.length;
    }

    // Improved hash function. Multiplies by a prime constant. Known as "Horner's method".
    _hash2(v, arr) {
        const H = 37;
        let out = 0;
        let idx = null;
        for (idx of Array(v.length).keys()) {
            out += H * out + v.charCodeAt(i);
        }
        out = out % arr.length;
        return out;
    }

    _find(k) {
        let h = this._hash1(k);
        while (Number.isNaN(this.store[h])) {
            console.log(h);
            h += 1;
        }
        return h;
    }

    // Hash table insertion with linear probing.
    insert(k, v) {
        let h = this._find(k);
        this.store[h] = v;
    }

    // Hash table get with linear probing.
    get(k) {
        let h = this._find(k);
        return this.store[h];
    }

    has(k) { return this.get(k) !== undefined; }

}

module.exports = {
    HashTableADT: HashTableADT
};