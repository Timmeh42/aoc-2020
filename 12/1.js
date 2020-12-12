module.exports = function (input) {
    input = input.split('\n');
    let dx = 1,
        dy = 0;
    let x = 0,
        y = 0;
    for (let line of input) {
        const instr = line[0];
        const value = parseInt(line.slice(1));
        switch (instr) {
            case 'N': {
                y -= value;
                break;
            }
            case 'S': {
                y += value;
                break;
            }
            case 'E': {
                x += value;
                break;
            }
            case 'W': {
                x -= value;
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
