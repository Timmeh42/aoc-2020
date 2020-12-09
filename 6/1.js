module.exports = function (input) {
    input = input.join('\n').split('\n\n');
    return input.reduce((sum, group) => sum + new Set(group.replace(/\n/g, '').split('')).size, 0);
}
