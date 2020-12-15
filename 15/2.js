module.exports = function (input) {
    const nums = new Map(input.split(',').map((n, i) => [parseInt(n), i+1]));
    let last = 0;
    let next = 0;
    for (let i = nums.size + 1; i <= 30000000; i++) {
        last = next;
        if (nums.has(last)) {
            next = i - nums.get(last);
        } else {
            next = 0;
        }
        nums.set(last, i);
    }
    return last;
}