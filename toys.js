const StackADT = require('./stack').StackADT;


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


module.exports = {
    convert_base: convert_base,
    palindrome: palindrome
};