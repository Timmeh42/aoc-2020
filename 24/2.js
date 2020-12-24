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
        let hash = dx * 10000 + dy;
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
    for (let day = 0; day < 100; day++) {
        let dminX = minX,
            dmaxX = maxX,
            dminY = minY,
            dmaxY = maxY;
        let newTiles = new Set();
        for (let x = minX - 1; x <= maxX + 1; x++)
        for (let y = minY - 1; y <= maxY + 1; y++) {
            let hash = x * 10000 + y;
            let adj = tiles.has(hash - 10000)
                    + tiles.has(hash - 10001)
                    + tiles.has(hash - 1)
                    + tiles.has(hash + 10000)
                    + tiles.has(hash + 10001)
                    + tiles.has(hash + 1)
                    ;
            if (adj === 2 || (adj === 1 && tiles.has(hash))) {
                newTiles.add(hash);
                dminX = x < dminX ? x : dminX;
                dmaxX = x > dmaxX ? x : dmaxX;
                dminY = y < dminY ? y : dminY;
                dmaxY = y > dmaxY ? y : dmaxY;
            }
        }
        minX = dminX;
        minY = dminY;
        maxX = dmaxX;
        maxY = dmaxY;
        tiles = newTiles;
    }
    return tiles.size;
}
