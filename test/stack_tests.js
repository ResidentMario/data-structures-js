const assert = require('assert');
const StackADT = require('../stack').StackADT;


describe("StackADT", () => {
    describe("push", () => {
        it("should add an element to the top", () => {
            let s = new StackADT();
            s.push(2);
            assert.equal(s.store[s.length - 1], 2);
        });
    });

    describe("pop", () => {
        it("should remove and return the topmost element when possible", () => {
            let s = new StackADT();
            s.push(2);
            let v = s.pop();
            assert.equal(v, 2);
            assert.deepEqual(s.store, []);
        });

        it("should fail when the stack is zero-length", () => {
            let s = new StackADT();
            assert.throws(() => s.pop(), SyntaxError);
        });
    });

    describe("peek", () => {
        it("should return the topmost element when possible", () => {
            let s = new StackADT();
            s.push(2);
            let v = s.peek();
            assert.equal(v, 2);
            assert.deepEqual(s.store, [2]);
        });

        it("should return undefined when the stack is zero-length", () => {
            let s = new StackADT();
            let v = s.peek();
            assert.deepEqual(v, undefined);
        });
    });

});