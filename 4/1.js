const fs = require('fs');
const rawInput = fs.readFileSync('input.txt', 'utf8').trimEnd();
const input = rawInput.split('\n\n');

const valid = input.filter(p => p.match(/byr|iyr|eyr|hgt|hcl|ecl|pid/g).length === 7);
console.log(valid.length);
