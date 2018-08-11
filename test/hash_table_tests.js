const assert = require('assert');
const HashTableADT = require('../hash_table').HashTableADT;


describe("HashTableADT", () => {

    describe("insert", () => {
        it("should add a raw keyed value", () => {
            let h = new HashTableADT(31);
            h.insert("Foo Key", "Foo Value");
            assert.equal(h.has("Foo Key"), true);
            assert.equal(h.get("Foo Key"), "Foo Value");
        });
    });

    describe("has", () => {
        it("should return true if the key is in the hash table", () => {
            let h = new HashTableADT(31);
            h.insert("Foo Key", "Foo Value");
            assert.equal(h.has("Foo Key"), true);
        });

        it("should return false if the key is not in the hash table", () => {
            let h = new HashTableADT(31);
            assert.equal(h.has("Bar Key"), false);
        });
    });

});