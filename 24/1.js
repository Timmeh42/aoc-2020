module.exports = function (input) {
    tiles = new Set();
    let minX = Infinity,
        maxX = -Infinity,
        minY = Infinity,
        maxY = -Infinity;
    for (let line of input.split('\n')) {
        let dx = 0,
            dy = 0;
        for (let dir of line.match(/ne|nw|w|sw|se|e/g)) {
            switch (dir) {
                case 'nw':
                    dx += -1;
                    dy += -1;
                    break;
                case 'ne':
                    dx += 0;
                    dy += -1;
                    break;
                case 'e':
                    dx += 1;
                    dy += 0;
                    break;
                case 'se':
                    dx += 1;
                    dy += 1;
                    break;
                case 'sw':
                    dx += 0;
                    dy += 1;
                    break;
                case 'w':
                    dx += -1;
                    dy += 0;
                    break;
            }
        }
        let hash = dx+','+dy;
        minX = dx < minX ? dx : minX;
        maxX = dx > maxX ? dx : maxX;
        minY = dy < minY ? dy : minY;
        maxY = dy > maxY ? dy : maxY;
        if (tiles.has(hash)) {
            tiles.delete(hash);
        } else {
            tiles.add(hash);
        }
    }
    return tiles.size;
}
