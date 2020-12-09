module.exports = function (input) {
    const width = input[0].length;
    
    let x = 0;
    let count = 0;
    for (let y = 0; y < input.length; y++) {
        count += input[y][x] === '#';
        x = (x+3) % width;
    }
    return count;
}