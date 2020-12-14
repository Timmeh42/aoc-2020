module.exports = function (input) {
    const lines = input.split('\n');
    let maskx = [];
    let mask1 = 1;
    let mem = new Map();
    for (let line of lines) {
        const [word, value] = line.split(' = ');
        if (word === 'mask') {
            mask1 = BigInt(parseInt(value.replace(/X/g, '0'), 2));
            maskx = [];
            let lastIndex = 0;
            while (value.indexOf('X', lastIndex) !== -1) {
                lastIndex = value.indexOf('X', lastIndex) + 1;
                maskx.push(BigInt(value.length - lastIndex));
            }
        } else {
            let address = BigInt(parseInt(word.slice(4, word.length - 1))) | mask1;
            for (let i = 0n; i < 2**maskx.length; i++) {
                let temp_address = address;
                for (let x = 0n; x < maskx.length; x++) {
                    let mask = maskx[x];
                    temp_address -= ((temp_address >> mask) & 1n) << mask;
                    temp_address += ((i >> x) & 1n) << mask;
                }
                mem.set(temp_address, BigInt(parseInt(value)));
            }
        }
    }
    return [...mem.values()].reduce((sum, n) => sum + n);
}
