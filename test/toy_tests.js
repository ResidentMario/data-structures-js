const convert_base = require('../toys').convert_base;
const palindrome = require("../toys").palindrome;
const square_dance = require("../toys").square_dance;
const radix_sort = require("../toys").radix_sort;
const assert = require('assert');


describe("convert_base", () => {
    it("works in the trivial case", () => {
        assert.equal(convert_base(1, 10), 1);
    });
    it("work for more complicated conversions", () => {
        assert.equal(convert_base(10, 5), 20);
    });
});


describe("palindrome", () => {
    it("works in the trivial case", () => {
        assert.equal(palindrome(""), true)
    });
    it("works in the even case", () => {
        assert.equal(palindrome("CAAC"), true);
        assert.equal(palindrome("ABCD"), false);
    });
    it("works in the odd case", () => {
        assert.equal(palindrome("CAC"), true);
        assert.equal(palindrome("ABC"), false);
    });
});


describe("square_dance", () => {
    it("succeeds when there is at least one valid pair waiting", () => {
        let s = square_dance();
        s.enqueue('Max', 'm');
        s.enqueue('Mary', 'w');
        assert.deepEqual(s.next(), ['Mary', 'Max']);
    });

    it("fails when there is no one waiting", () => {
        assert.throws(() => { let s = square_dance(); s.next() });
    });

    it("fails when there is only a man waiting", () => {
        assert.throws(() => { let s = square_dance(); s.enqueue('Max', 'm'); s.next() });
    });

    it("fails when there is only a woman waiting", () => {
        assert.throws(() => { let s = square_dance(); s.enqueue('Mary', 'w'); s.next() });
    });
});


describe("radix_sort", () => {
    it("succeeds in the zero-item trivial case", () => {
        let q = radix_sort();
        assert.equal(q.empty(), true);
    });

    it("succeeds in the one-item trivial case", () => {
        let q = radix_sort(1);
        assert.equal(q.dequeue(), 1);
    });

    it("succeeds in the single-digit case", () => {
        let q = radix_sort(1, 2, 3);
        assert.equal(q.dequeue(), 1);
        assert.equal(q.dequeue(), 2);
        assert.equal(q.dequeue(), 3);
    });

    it("succeeds in the two-digit case", () => {
        let q = radix_sort(11, 22);
        assert.equal(q.dequeue(), 11);
        assert.equal(q.dequeue(), 22);
    });

    it("succeeds in the mixed-digit case", () => {
        let q = radix_sort(1, 5, 10, 25, 105);
        assert.equal(q.dequeue(), 1);
        assert.equal(q.dequeue(), 5);
        assert.equal(q.dequeue(), 10);
        assert.equal(q.dequeue(), 25, 105);
    });
});