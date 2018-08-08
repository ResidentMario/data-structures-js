const assert = require('assert');
const QueueADT = require('../queue').QueueADT;


describe("QueueADT", () => {
    describe("enqueue", () => {
        it("should add an element to the back", () => {
            let q = new QueueADT();
            q.enqueue(2);
        });
    });

    describe("dequeue", () => {
        it("should remove and return an element from the front", () => {
            let q = new QueueADT();
            q.enqueue(2);
            q.dequeue();
        });

        it("should fail when the queue is zero-length", () => {
            let q = new QueueADT();
            assert.throws(() => q.dequeue(), SyntaxError);
        });
    });

    describe("front", () => {
        it("should peek at the front element of the queue", () => {
            let q = new QueueADT();
            q.enqueue(2);
            q.enqueue(3);
            assert.equal(q.front(), 2);
        });

        it("should fail when the queue is zero-length", () => {
            let q = new QueueADT();
            assert.throws(() => q.front(), SyntaxError);
        });
    });

    describe("back", () => {
        it("should peek at the back element of the queue", () => {
            let q = new QueueADT();
            q.enqueue(2);
            q.enqueue(3);
            assert.equal(q.back(), 3);
        });

        it("should fail when the queue is zero-length", () => {
            let q = new QueueADT();
            assert.throws(() => q.front(), SyntaxError);
        });
    });

    describe("empty", () => {
        it("should work", () => {
            let q = new QueueADT();
            q.enqueue(2);
            assert.equal(q.empty(), false);
            q.dequeue();
            assert.equal(q.empty(), true);
        });

        it("should fail when the queue is zero-length", () => {
            let q = new QueueADT();
            assert.throws(() => q.front(), SyntaxError);
        });
    });

});