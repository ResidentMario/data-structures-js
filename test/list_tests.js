const assert = require('assert');
const ListADT = require('../list').ListADT;

describe('ListADT', () => {
    describe('constructor', () => {
        it('should work with no input', () => {
            let l = new ListADT();
            assert.equal(l.length, 0);
        });

        it('should work with any input', () => {
            let l = new ListADT([1]);
            assert.equal(l.store[0], 1);
            assert.equal(l.length, 1);
        });
    });

    describe('append', () => {
        it('should append', () => {
            let l = new ListADT();
            l.append(1);
            assert.equal(l.store[0], [1]);
            assert.equal(l.length, 1);
        });
    });

    describe('_get_node', () => {
        it('should return the correct indices for values in the list', () => {
            let l = new ListADT([1, 2, 3]);
            let idx = l.find(3);
            assert.equal(idx, 2);
        });

        it('should return -1 for values not in the list', () => {
            let l = new ListADT([1, 2, 3]);
            let idx = l.find(4);
            assert.equal(idx, -1);
        });
    });

    describe('remove', () => {
        it('should return -1 when the given value is not in the list', () => {
            let l = new ListADT([1, 2, 3]);
            let v = l.remove(4);
            assert.equal(v, -1);
        });

        it('should remove the given value when it is contained in the list', () => {
            let l = new ListADT([1, 2, 3]);
            let v = l.remove(3);
            assert.equal(v, 2);
            assert.deepEqual(l.store, [1, 2]);
            assert.equal(l.length, 2);
        });
    });

    describe('insert', () => {
        it('should properly insert values given legal values', () => {
            // Combined test, technically not a good idea but meh.
            let l = new ListADT([1, 2, 3]);
            let v1 = l.insert(4, 2);
            let v2 = l.insert(0, -1);
            let v3 = l.insert(1.5, 1);
            assert.deepEqual(l.store, [0, 1, 1.5, 2, 3, 4])
            });

        it('should raise an error when given illegal values', () => {
            let l = new ListADT([1, 2, 3]);
            assert.throws(() => l.insert(4, 10), SyntaxError);
        });
    });

    describe('clear', () => {
        it('should completely clear all values', () => {
            let l = new ListADT([1, 2, 3]);
            l.clear();
            assert.deepEqual(l.store, []);
            assert.equal(l.length, 0);
        });
    });

    describe('iter', () => {
        it('should create an already-completed iterator when it doesn\'t have any values', () => {
            let l = new ListADT([]);
            let i = l.iter();
            assert.deepEqual(i.next(), {done: true});
        });

        it('should create an exhaustable iterator when it does have some values', () => {
            let l = new ListADT([1]);
            let i = l.iter();
            assert.deepEqual(i.next(), {value: 1, done: false});
            assert.deepEqual(i.next(), {done: true});
        });

        it('should keep the interior iterator class private', () => {
            let l = new ListADT([1]);
            let i = l.iter();
            assert.equal(Object.hasOwnProperty(i.next()), false)
        });
    });
});