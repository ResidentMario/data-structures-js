const assert = require('assert');
const LinkedListADT = require('../linked_list').LinkedListADT;


describe("LinkedListADT", () => {

    describe("append", () => {
        it("should work when inserting one value", () => {
            let l = new LinkedListADT();
            l.append(2);
            assert.equal(l.head.value, 2);
        });

        it("should work when inserting multiple values", () => {
            let l = new LinkedListADT();
            l.append(2);
            l.append(3);
            assert.equal(l.head.value, 2);
            assert.equal(l.tail.value, 3);
        });
    });

    describe("get", () => {
        it("should work on the first value in the list", () => {
            let l = new LinkedListADT();
            l.append(2);
            l.append(3);
            assert.equal(l.get(0), 2);
        });

        it("should work on the last value in the list", () => {
            let l = new LinkedListADT();
            l.append(2);
            l.append(3);
            assert.equal(l.get(1), 3);
        });

        it("throws when the requested index is out of range", () => {
            let l = new LinkedListADT();
            l.append(2);
            assert.throws(() => l.get(-1), Error);
            assert.throws(() => l.get(1), Error);
        });

        it("should work on intermediate values", () => {
            let l = new LinkedListADT();
            l.append(2);
            l.append(3);
            l.append(4);
            assert.equal(l.get(1), 3);
        });

    });

    describe("insert", () => {
        // Tests assume append works.
        it("should work on the first value in the list", () => {
            let l = new LinkedListADT();
            l.insert(2, 0);
            assert.equal(l.get(0), 2);
        });

        it("should work on an append to the end of the list", () => {
            let l = new LinkedListADT();
            l.append('Foo');
            l.insert('Bar', 1);
            assert.equal(l.get(1), 'Bar');
        });

        it("should work on intermediate values", () => {
            let l = new LinkedListADT();
            l.append('Foo');
            l.append('Baz');
            l.insert('Bar', 1);
            assert.equal(l.get(1), 'Bar');
        });

        it("throws when the requested index is out of range", () => {
            let l = new LinkedListADT();
            assert.throws(() => l.insert('Fizz', -1), Error);
            assert.throws(() => l.insert('Fizz', 1), Error);
        });

    });

});