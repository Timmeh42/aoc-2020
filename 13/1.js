module.exports = function (input) {
    const [time, schedule] = input.split('\n');
    const buses = schedule
        .split(',')
        .filter(b => b !== 'x')
        .map(b => parseInt(b))
        .sort((a, b) =>
            (a * Math.ceil(time / a))
             - (b * Math.ceil(time / b)))
    ;
    
    return buses[0] * (buses[0] * Math.ceil(time / buses[0]) - time);
}
