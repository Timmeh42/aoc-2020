const fs = require('fs');
const rawInput = fs.readFileSync('input.txt', 'utf8').trimEnd();
const groups = rawInput.split('\n\n');

console.log(groups.reduce((sum, group) => sum + new Set(group.replace(/\n/g, '').split('')).size, 0));
