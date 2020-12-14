module.exports = function (input) {
    const lines = input.split('\n');
    let mask0 = 0;
    let mask1 = 1;
    let mem = new Map();
    for (let line of lines) {
        const [word, value] = line.split(' = ');
        if (word === 'mask') {
            mask0 = BigInt(parseInt(value.replace(/X/g, '1'), 2));
            mask1 = BigInt(parseInt(value.replace(/X/g, '0'), 2));
        } else {
            mem.set(word, (BigInt(parseInt(value)) & mask0) | mask1);
        }
    }
    return [...mem.values()].reduce((sum, n) => sum + n);
}
