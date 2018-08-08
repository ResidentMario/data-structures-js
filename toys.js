const StackADT = require('./stack').StackADT;
const QueueADT = require('./queue').QueueADT;

/**
 * Stack-backed base conversion algorithm. Only works for bases 1 through 10.
 * @param n - The number being converted.
 * @param b - The new base.
 */
function convert_base(n, b) {
    let s = new StackADT();
    while(n > 0) {
        s.push(n % b);
        n = Math.round(n / b);
    }

    let out = 0;
    let pos = 0;
    let digits = [];
    while (s.peek() !== undefined) { digits.push(s.pop().toString()); }
    return parseInt(digits.reduce((a, b) => a + b));
}


/**
 * Determineds whether or not the given string is a palindrome.
 * @param s The input string.
 * @returns {boolean}
 */
function palindrome(s) {
    let pl = Math.floor(s.length / 2);
    let pr = Math.ceil(s.length / 2);
    let left = s.slice(0, pl);
    let right = s.slice(pr);

    let right_reversed = right.split("").reverse().join("");
    return left === right_reversed;
}


// Fiddling with closures.
function square_dance() {
    let out = null;
    (() => {
        class Square {
            constructor() { [this.w_q, this.m_q] = [new QueueADT(), new QueueADT()]; }

            enqueue(name, gender) {
                (gender === 'm') ? this.m_q.enqueue(name) : this.w_q.enqueue(name);
            }

            /**
             * Attempts to iterate through and return the freshest pair amongst those currently waiting. Throws an
             * error if there isn't currently a pair waiting.
             * @returns {*[]} - A two-item list whose first element is the next woman and second element the next man.
             */
            next() {
                if (this.w_q.empty() || this.m_q.empty()) {
                    throw Error("No dance pairs currently available. Please try again later.");
                } else {
                    return [this.w_q.dequeue(), this.m_q.dequeue()];
                }
            }
        }

        out = new Square();
    })();
    return out;
}


module.exports = {
    convert_base: convert_base,
    palindrome: palindrome,
    square_dance: square_dance
};