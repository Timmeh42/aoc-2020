module.exports = function (input) {
    input = input.split('\n');
    let dx = 10,
        dy = -1;
    let x = 0,
        y = 0;
    for (let line of input) {
        const instr = line[0];
        const value = parseInt(line.slice(1));
        switch (instr) {
            case 'N': {
                dy -= value;
                break;
            }
            case 'S': {
                dy += value;
                break;
            }
            case 'E': {
                dx += value;
                break;
            }
            case 'W': {
                dx -= value;
                break;
            }
            case 'F': {
                x += dx * value;
                y += dy * value;
                break;
            }
            case 'L': {
                for (let d = value; d > 0; d-=90) {
                    [dy, dx] = [-dx, dy];
                }
                break;
            }
            case 'R': {
                for (let d = value; d > 0; d-=90) {
                    [dy, dx] = [dx, -dy];
                }
                break;
            }
        }
    }
    return Math.abs(x) + Math.abs(y);
}
