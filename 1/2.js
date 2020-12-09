module.exports = function (input) {
    input = input.map(i => parseInt(i));
    for (let i = input.length - 1; i >= 0; i--)
    for (let j = i - 1; j >= 0; j--)
    for (let k = j - 1; k >= 0; k--) {
        if (input[i] + input[j] + input[k] === 2020) {
            return input[i] * input[j] * input[k];
        }
    }
}
