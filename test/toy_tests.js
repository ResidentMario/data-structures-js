const convert_base = require('../toys').convert_base;
const palindrome = require("../toys").palindrome;
const square_dance = require("../toys").square_dance;
const radix_sort = require("../toys").radix_sort;
const priority_queue = require('../toys').priority_queue;
const longest_common_substring_brute_force = require('../toys').longest_common_substring_brute_force;
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


describe("priority_queue", () => {
    it("fails in the trivial zero-object case", () => {
        let q = priority_queue();
        assert.throws(() => q.dequeue(), Error)
    });

    it("works in the trivial one-object case", () => {
        let q = priority_queue();
        q.enqueue('foo', 1);
        assert.equal(q.dequeue(), 'foo');
    });

    it("correctly prioritizes objects on dequeue", () => {
        let q = priority_queue();
        q.enqueue('foo', 1);
        q.enqueue('bar', 2);
        assert.equal(q.dequeue(), 'bar');
        assert.equal(q.dequeue(), 'foo');
    });

    it("correctly prioritizes objects on dequeue after cleaning out", () => {
        let q = priority_queue();
        q.enqueue('foo', 1);
        q.enqueue('bar', 2);
        assert.equal(q.dequeue(), 'bar');
        assert.equal(q.dequeue(), 'foo');
        q.enqueue('baz', 0);
        q.enqueue('mob', 3);
        assert.equal(q.dequeue(), 'mob');
        assert.equal(q.dequeue(), 'baz');
    });

    it("correctly prioritizes objects with the same priority", () => {
        let q = priority_queue();
        q.enqueue('foo', 1);
        q.enqueue('bar', 1);
        assert.equal(q.dequeue(), 'foo');
        assert.equal(q.dequeue(), 'bar');
    });
});


describe("longest_common_substring_brute_force", () => {
    it("works in the trivial case", () => {
        assert.equal(longest_common_substring_brute_force('A', 'A'), 'A');
    });

    it("works in the lengthy full-match case", () => {
        assert.equal(longest_common_substring_brute_force('AAAA', 'AAAA'), 'AAAA');
    });

    it("works in partial cases", () => {
        assert.equal(longest_common_substring_brute_force('ABBA', 'ABAB'), 'AB');
    });

    it("works on matches in later parts of the string", () => {
        assert.equal(longest_common_substring_brute_force('ABBA', 'CBBC'), 'BB');
    });
});