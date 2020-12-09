module.exports = function (input) {
    input = input.split('\n');
    const width = input[0].length;

    let mult = 1;
    for (let slope of [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]) {
        let x = 0;
        let count = 0;
        for (let y = 0; y < input.length; y += slope[1]) {
            count += input[y][x] === '#';
            x = (x + slope[0]) % width;
        }
        mult *= count;
    }
    return mult;
}