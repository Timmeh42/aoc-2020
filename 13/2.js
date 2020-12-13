module.exports = function (input) {
    const [_, schedule] = input.split('\n');
    const buses = schedule
        .split(',')
        .map((b, i) => b === 'x' ? b : [parseInt(b), i])
        .filter(b => b !== 'x');
    ;
    let loop = 1;
    let time = 0;
    for (let bus of buses) {
        while ((time + bus[1]) % bus[0] !== 0) {
            time += loop;
        }
        loop *= bus[0];
    }
    return time;
}
