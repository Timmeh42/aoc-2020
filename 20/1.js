module.exports = function (input) {
    const tiles = input.split('\n\n')
                        .map(t => {
                                let raw = t.split('\n').slice(1);
                                return {
                                    id: parseInt(t.slice(5, t.indexOf('\n') - 1)),
                                    raw: raw,
                                    position: {x: null, y: null},
                                    rotation: 0,
                                    flip: false, 
                                    sides: [
                                        raw[0],
                                        raw.map(r => r[9]).join(''),
                                        raw[9].split('').reverse().join(''),
                                        raw.map(r => r[0]).reverse().join(''),
                                    ],
                                }
                            });

    console.log(tiles[0])
    return;
}
