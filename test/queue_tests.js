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
        it("remove and return an element from the front", () => {
            let q = new QueueADT();
            q.enqueue(2);
            q.dequeue();
        });

        it("should fail when the queue is zero-length", () => {
            let q = new QueueADT();
            assert.throws(() => q.dequeue(), SyntaxError);
        });
    });
});