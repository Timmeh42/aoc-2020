module.exports = function (input) {
    return input.split('\n').reduce((max, b) => Math.max(max, parseInt(b.replace(/\w/g, match => ({F: '0', B: '1', L:'0', R: '1'}[match])), 2)), -Infinity);
}