module.exports = function (input) {
    input = input.split('\n').map(i => parseInt(i)).sort((a, b) => a - b);
    input.push(input[input.length-1] + 3);
    const j1 = input.filter((v, i, a) => (i !== 0 ? v - a[i-1] : v) === 1).length;
    const j3 = input.filter((v, i, a) => (i !== 0 ? v - a[i-1] : v) === 3).length;
    return j1 * j3;
}
