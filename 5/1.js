const fs = require('fs');
const rawInput = fs.readFileSync('input.txt', 'utf8').trimEnd();
const input = rawInput.split('\n');

console.log(
    input.reduce((max, b) => Math.max(max, parseInt(b.replace(/\w/g, match => ({F: '0', B: '1', L:'0', R: '1'}[match])), 2)), -Infinity)
);