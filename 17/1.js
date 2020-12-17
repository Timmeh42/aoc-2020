module.exports = function (input) {
    let read = new Map();
    let write = new Map();
    for (let [y, line] of input.split('\n').entries()) {
        for (let [x, v] of line.split('').entries()) {
            read.set(x +' '+ y + ' ' + 0, v === '#');
        }
    }
    let zmin = 0,
        zmax = 1;
    let ymin = 0,
        ymax = input.split('\n')[0].length;
    let xmin = 0,
        xmax = input.split('\n')[0].length;

    for (let t = 1; t <= 6; t++) {
        for (let z = zmin - t; z < zmax + t; z++)
        for (let y = ymin - t; y < ymax + t; y++)
        for (let x = xmin - t; x < xmax + t; x++) {
            let active = read.get(x +' '+ y + ' ' + z) || false;
            let neighbours = 0 - active;
            for (let dz = z - 1; dz <= z + 1; dz++)
            for (let dy = y - 1; dy <= y + 1; dy++)
            for (let dx = x - 1; dx <= x + 1; dx++) {
                neighbours += read.get(dx +' '+ dy + ' ' + dz) || 0;
            }
            if (active) {
                if (neighbours === 2 || neighbours === 3) {
                    write.set(x +' '+ y + ' ' + z, true);
                } else {
                    write.set(x +' '+ y + ' ' + z, false);
                }
            } else {
                if (neighbours === 3) {
                    write.set(x +' '+ y + ' ' + z, true);
                } else {
                    write.set(x +' '+ y + ' ' + z, false);
                }
            }
        }
        [read, write] = [write, read];
    }
    return [...read.values()].reduce((sum, v) => sum += v, 0);
}
