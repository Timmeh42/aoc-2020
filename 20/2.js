module.exports = function (input) {
    const tiles = new Map();
    input.split('\n\n')
        .forEach(t => {
            const lines = t.split('\n');
            const id = parseInt(lines[0].slice(5, -1));
            const body = lines.slice(1).map(l => l.split(''));
            let edges = [
                lines[1].split(''),
                lines.slice(1).map(l => l[9]),
                lines[10].split('').reverse(),
                lines.slice(1).map(l => l[0]).reverse(),
            ];
            tiles.set(id, {
                id,
                body,
                edges,
                pos: {x: null, y: null},
            })
        });
    let matchedTiles = new Map();
    let startTile = tiles.get(2903);
    tiles.delete(2903);
    startTile.pos.x = 0;
    startTile.pos.y = 0;
    matchedTiles.set(0, startTile);
    tileMatch(tiles, matchedTiles, startTile);
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    matchedTiles.forEach((t, k) => {
        minX = Math.min(minX, t.pos.x);
        maxX = Math.max(maxX, t.pos.x);
        minY = Math.min(minY, t.pos.y);
        maxY = Math.max(maxY, t.pos.y);
    });

    let grid = [[],[],[],[],[],[],[],[],[],[],[],[],];
    matchedTiles.forEach((t, k) => {
        grid[t.pos.y - minY][t.pos.x - minX] = t;
    });
    let map = '';
    let seamap = '';
    for (let y = 0; y < grid.length; y++) {
        for (let line = 1; line < 9; line++) {
            map += grid[y].reduce((l, t) => l + t.body[line].slice(1, -1).join(''), '') + '\n'
            seamap += grid[y].reduce((l, t) => l + t.body[line].slice(1, -1).join(''), '')
        }
    }
    // console.log(seamap.match(/#.{77}#....##....##....###.{77}#..#..#..#..#..#/g))
    // console.log(seamap.match(/#.{94}###....##....##....#.{79}#..#..#..#..#..#/g))
    // console.log(seamap.match(/#.{95}##.{94}#.{94}#.{287}#.{96}#.{95}#.{94}#.{287}#.{96}#.{95}#.{94}#.{287}#.{96}#/g))
    // console.log(seamap.match(/#.{94}##.{95}#.{96}#.{287}#.{94}#.{95}#.{96}#.{287}#.{94}#.{95}#.{96}#.{287}#.{94}#/g))
    // seamap = seamap.split('').reverse().join('')
    // console.log(seamap.match(/#.{77}#....##....##....###.{77}#..#..#..#..#..#/g))
    // console.log(seamap.match(/#.{94}###....##....##....#.{79}#..#..#..#..#..#/g))
    // console.log(seamap.match(/#.{95}##.{94}#.{94}#.{287}#.{96}#.{95}#.{94}#.{287}#.{96}#.{95}#.{94}#.{287}#.{96}#/g))
    // console.log(seamap.match(/#.{94}##.{95}#.{96}#.{287}#.{94}#.{95}#.{96}#.{287}#.{94}#.{95}#.{96}#.{287}#.{94}#/g))
    seamap = seamap.split('').reverse().join('');
    let monsters = seamap.match(/#(?=.{95}##.{94}#.{94}#.{287}#.{96}#.{95}#.{94}#.{287}#.{96}#.{95}#.{94}#.{287}#.{96}#)/g);
    return seamap.replace(/\./g, '').length - monsters.length * 15;
}

function tileMatch(freeTiles, matchedTiles, tile) {
    let offsets = [
        {x: 0, y:-1},
        {x: 1, y:0},
        {x: 0, y:1},
        {x: -1, y:0},
    ];
    for (let e = 0; e < 4; e++) {
        let c = (e + 2) % 4;
        let nextTile;
        matcher: for (let freeTile of [...freeTiles.values()]) {
            for (let r = 0; r < 4; r++) {
                tileRotate(freeTile);
                if (freeTile.edges[c].join('') === tile.edges[e].slice().reverse().join('')) {
                    nextTile = freeTile;
                    freeTile.pos.x = tile.pos.x + offsets[e].x;
                    freeTile.pos.y = tile.pos.y + offsets[e].y;
                    freeTiles.delete(freeTile.id);
                    matchedTiles.set(freeTile.pos.x * 1000 + freeTile.pos.y, freeTile);
                    break matcher;
                }
            }
            tileFlip(freeTile);
            for (let r = 0; r < 4; r++) {
                tileRotate(freeTile);
                if (freeTile.edges[c].join('') === tile.edges[e].slice().reverse().join('')) {
                    nextTile = freeTile;
                    freeTile.pos.x = tile.pos.x + offsets[e].x;
                    freeTile.pos.y = tile.pos.y + offsets[e].y;
                    freeTiles.delete(freeTile.id);
                    matchedTiles.set(freeTile.pos.x * 1000 + freeTile.pos.y, freeTile);
                    break matcher;
                }
            }
        }
        if (nextTile) {
            tileMatch(freeTiles, matchedTiles, nextTile);
        }
    }
}

function tileRotate (tile) {
    tile.edges.unshift(tile.edges.pop());
    let newBody = [];
    for (let y = 0; y < 10; y++) {
        newBody[y] = [];
        for (let x = 0; x < 10; x++) {
            newBody[y][x] = tile.body[9 - x][y];
        }
    }
    tile.body = newBody;
    return tile;
}

function tileFlip (tile) {
    tile.edges = tile.edges.map(e => e.reverse());
    tile.edges = [
        tile.edges[0],
        tile.edges[3],
        tile.edges[2],
        tile.edges[1],
    ]
    tile.body = tile.body.map(l => l.reverse());
    return tile;
}