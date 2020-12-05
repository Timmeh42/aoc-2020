const fs = require('fs');
const rawInput = fs.readFileSync('input.txt', 'utf8').trimEnd();
const input = rawInput.split('\n');

console.log(
    input.map(b => parseInt(b.replace(/\w/g, c => ({F: '0', B: '1', L:'0', R: '1'}[c])), 2)).sort((a, b) => a-b).find((v, i, s) => i !== 0 && s[i-1] == v-2) - 1
);