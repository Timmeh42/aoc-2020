module.exports = function (input) {
    let read = new Set();
    let write = new Set();
    for (let [y, line] of input.split('\n').entries()) {
        for (let [x, v] of line.split('').entries()) {
            if (v === '#') {
                read.add(x +' '+ y + ' ' + 0 + ' ' + 0);
            }
        }
    }
    let wmin = 0,
        wmax = 1;
    let zmin = 0,
        zmax = 1;
    let ymin = 0,
        ymax = input.split('\n')[0].length;
    let xmin = 0,
        xmax = input.split('\n')[0].length;

    for (let t = 1; t <= 6; t++) {
        for (let w = wmin - t; w < wmax + t; w++)
        for (let z = zmin - t; z < zmax + t; z++)
        for (let y = ymin - t; y < ymax + t; y++)
        for (let x = xmin - t; x < xmax + t; x++) {
            let active = read.has(x +' '+ y + ' ' + z + ' ' + w);
            let neighbours = 0 - active;
            for (let dw = w - 1; dw <= w + 1; dw++)
            for (let dz = z - 1; dz <= z + 1; dz++)
            for (let dy = y - 1; dy <= y + 1; dy++)
            for (let dx = x - 1; dx <= x + 1; dx++) {
                neighbours += read.has(dx +' '+ dy + ' ' + dz + ' ' + dw);
            }
            if (active) {
                if (neighbours === 2 || neighbours === 3) {
                    write.add(x +' '+ y + ' ' + z + ' ' + w);
                } else {
                    write.delete(x +' '+ y + ' ' + z + ' ' + w);
                }
            } else {
                if (neighbours === 3) {
                    write.add(x +' '+ y + ' ' + z + ' ' + w);
                } else {
                    write.delete(x +' '+ y + ' ' + z + ' ' + w);
                }
            }
        }
        [read, write] = [write, read];
    }
    return read.size;
}
