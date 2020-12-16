module.exports = function (input) {
    const sections = input.split('\n\n');
    const rangeRegex = /(?:(?<min>\d+)-(?<max>\d+))/g;
    const ranges = [];
    let res;
    while (res = rangeRegex.exec(sections[0])) {
        ranges.push([
            parseInt(res.groups.min),
            parseInt(res.groups.max)
        ]);
    }

    const ticketVals = sections[2].match(/\d+/g).map(x => parseInt(x));
    return ticketVals.reduce((sum, x) => sum + !ranges.some(r => x >= r[0] && x <= r[1]) * x, 0);
}
