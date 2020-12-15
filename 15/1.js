module.exports = function (input) {
    const size = 2020;
    const nums = new Uint32Array(size);
    input.split(',').map(n => parseInt(n)).forEach((n, i) => nums[n] = i+1);
    let last = 0;
    let next = 0;
    for (let i = input.split(',').length + 1; i <= size; i++) {
        last = next;
        const lastSeen = nums[last];
        if (lastSeen !== 0) {
            next = i - lastSeen;
        } else {
            next = 0;
        }
        nums[last] = i;
    }
    return last;
}