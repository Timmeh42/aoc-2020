module.exports = function (input) {
    input = input.split('\n');
    let dx = 1;
    let dy = 0;
    let x = 0;
    let y = 0;
    for (let line of input) {
        switch (line[0]) {
            case 'N': {
                y -= parseInt(line.slice(1));
                break;
            }
            case 'S': {
                y += parseInt(line.slice(1));
                break;
            }
            case 'E': {
                x += parseInt(line.slice(1));
                break;
            }
            case 'W': {
                x -= parseInt(line.slice(1));
                break;
            }
            case 'F': {
                x += dx * parseInt(line.slice(1));
                y += dy * parseInt(line.slice(1));
                break;
            }
            case 'L': {
                for (let d = parseInt(line.slice(1)); d > 0; d-=90) {
                    [dy, dx] = [-dx, dy];
                }
                break;
            }
            case 'R': {
                for (let d = parseInt(line.slice(1)); d > 0; d-=90) {
                    [dy, dx] = [dx, -dy];
                }
                break;
            }
        }
    }
    return Math.abs(x) + Math.abs(y);
}
