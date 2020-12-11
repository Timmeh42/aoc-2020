module.exports = function (input) {
    let reading = input.split('\n').map(y => y.split(''));
    let writing = input.split('\n').map(y => y.split(''));
    const height = reading.length - 1;
    const width = reading[0].length - 1;
    const neighbors = new Map();

    let changed = true;
    while (changed) {
        changed = false;
        for (let y = 0; y <= height; y++)
        for (let x = 0; x <= width; x++) {
            if (reading[y][x] === '.') continue;
            let occ_count = 0;

            for (let xx = -1; xx <= 1; xx++)
            for (let yy = -1; yy <= 1; yy++)
            for (let range = 1; range < 1000; range++) {
                if (0 > x+xx*range || width < x+xx*range || 0 > y+yy*range || height < y+yy*range) break;
                if (reading[y+yy * range][x+xx * range] === 'L') break;
                if (reading[y+yy * range][x+xx * range] === '#') {
                    occ_count++;
                    break;
                }
            }

            if (reading[y][x] === 'L' && occ_count === 0) {
                writing[y][x] = '#';
                changed = true;
            } else if (reading[y][x] === '#' && occ_count >= 6) {
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
