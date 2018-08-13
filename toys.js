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
 * Determines whether or not the given string is a palindrome.
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


/**
 * Square dance algorithm. Allows you to take individuals, classified as male or female, and enqueue them; then later
 * request the next pair square off. Uses a closure to make the queue objects a private field. From page 66 of the book.
 * @returns {*}
 */
function square_dance() {
    let out = null;
    (() => {
        // The queue is invisible to the user.
        let [w_q, m_q] = [new QueueADT(), new QueueADT()];

        /**
         * Add a person to the square dance waiting list.
         * @param name - The name of the person.
         * @param gender - The gender shorthand of the person, one of {'m', 'w'}.
         */
        function enqueue(name, gender) {
            (gender === 'm') ? m_q.enqueue(name) : w_q.enqueue(name);
        }

        /**
         * Attempts to iterate through and return the freshest pair amongst those currently waiting. Throws an
         * error if there isn't currently a pair waiting.
         * @returns {*[]} - A two-item list whose first element is the next woman and second element the next man.
         */
        function next() {
            if (w_q.empty() || m_q.empty()) {
                throw Error("No dance pairs currently available. Please try again later.");
            } else {
                return [w_q.dequeue(), m_q.dequeue()];
            }
        }

        out = {enqueue: enqueue, next: next};
    })();
    return out;
}


/**
 * Returns the most significant digit from each of the values in the input. Used by radix_sort.
 * @param values - A list of integer values.
 * @returns {number} - The length of the most significant integer.
 * @private
 */
function  _sigfig(...values) {
    const max_sigfigs = values.map(v => v.toString().length).reduce((a, b) => a > b ? a : b);
    return values.map(v => (v.toString().length === max_sigfigs) ? v.toString()[max_sigfigs] : 0);
}


/**
 * Implements the radix sort algorithm. See page 67 of the book.
 * @param values
 * @returns {QueueADT}
 */
function radix_sort(...values) {
    let q = new QueueADT();
    if (values.length === 0) { return q; }

    const sigfigs = _sigfig(...values);

    let map = {};
    values.forEach((v, i) => map.hasOwnProperty(v) ? map[v].push(i) : map[v] = [i]);

    Object.keys(map).forEach(v => {
        let idxs = values[map[v]];
        if (idxs.length > 1) {
            let colliding_entries = idxs.map(idx => Math.floor(values[idx] / 10));
            let subq = radix_sort(colliding_entries);
            while (!subq.empty()) { q.enqueue(subq.dequeue()); }
        } else {
            q.enqueue(values[map[v][0]]);
        }
    });
    return q;
}


function priority_queue() {
    let out = null;
    (() => {
        let priority_map = {};
        let q = new QueueADT();

        function enqueue(v, p) {
            if (priority_map.hasOwnProperty(p)) {
                priority_map[p].enqueue(v);
            } else {
                let subq = new QueueADT(); subq.enqueue(v);
                priority_map[p] = subq;
            }
        }

        function dequeue() {
            if (Object.keys(priority_map).length === 0) {
                throw Error("Cannot dequeue from an empty priority queue.")
            }

            let ks = Object.keys(priority_map);
            let highest_priority_queue_key = ks[ks.length - 1];
            let highest_priority_queue = priority_map[highest_priority_queue_key];
            let out = highest_priority_queue.dequeue();
            if (highest_priority_queue.empty()) {
                delete priority_map[highest_priority_queue_key];
            }
            return out;
        }

        out = {enqueue: enqueue, dequeue: dequeue}
    })();

    return out;
}


function longest_common_substring_brute_force(a, b) {
    let curr_seq = "";
    let memo = {};

    function match_length(a_idx, b_idx) {
        let len = 0;
        while((a.charAt(a_idx) === b.charAt(b_idx)) && ((a_idx < a.length) && (b_idx < b.length))) {
            a_idx += 1; b_idx += 1; len += 1;
        }
        return len;
    }

    function check(a_idx, b_idx) {
        let len = 0;
        if (memo.hasOwnProperty(a_idx) && memo.hasOwnProperty(b_idx)) {
            len = memo[a_idx][b_idx];
            return len;
        } else {
            len = match_length(a_idx, b_idx);
            for (let sublen of Object.keys([...Array(len)])) { sublen = parseInt(sublen); }
        }
        return len;
    }

    let [longest_a_idx, longest_b_idx, longest_len] = [null, null, 0];
    for (let a_idx of Object.keys([...Array(a.length)])) {
        for (let b_idx of Object.keys([...Array(b.length)])) {
            [a_idx, b_idx] = [parseInt(a_idx), parseInt(b_idx)];
            let new_len = check(a_idx, b_idx);
            if (new_len > longest_len) {
                longest_len = new_len;
                longest_a_idx = a_idx;
                longest_b_idx = b_idx;
            }
        }
    }

    return a.slice(longest_a_idx, longest_a_idx + longest_len);
}


module.exports = {
    convert_base: convert_base,
    palindrome: palindrome,
    square_dance: square_dance,
    radix_sort: radix_sort,
    priority_queue: priority_queue,
    longest_common_substring_brute_force: longest_common_substring_brute_force
};