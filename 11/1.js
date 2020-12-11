module.exports = function (input) {
    let reading = input.split('\n').map(y => y.split(''));
    let writing = input.split('\n').map(y => y.split(''));
    const height = reading.length - 1;
    const width = reading[0].length - 1;

    let changed = true;
    while (changed) {
        changed = false;
        for (let y = 0; y <= height; y++)
        for (let x = 0; x <= width; x++) {
            if (reading[y][x] === '.') continue;
            let occ_count = 0;
            for (let xx = Math.max(x - 1, 0); xx <= Math.min(width, x + 1); xx++)
            for (let yy = Math.max(y - 1, 0); yy <= Math.min(height, y + 1); yy++) {
                occ_count += reading[yy][xx] === '#';
            }
            if (reading[y][x] === 'L' && occ_count === 0) {
                writing[y][x] = '#';
                changed = true;
            } else if (reading[y][x] === '#' && occ_count >= 5) {
                writing[y][x] = 'L';
                changed = true;
            } else {
                writing[y][x] = reading[y][x];
            }
        }
        [reading, writing] = [writing, reading];
    }
    return reading.reduce((sum, arr) => sum += arr.filter(n => n === '#').length, 0);
}
