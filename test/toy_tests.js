const convert_base = require('../toys').convert_base;
const palindrome = require("../toys").palindrome;
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