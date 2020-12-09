module.exports = function (input) {
    input = input.split('\n\n');
    return input.reduce((sum, group) => sum + new Set(group.replace(/\n/g, '').split('')).size, 0);
}
