const fs = require('fs');
const rawInput = fs.readFileSync('input.txt', 'utf8').trimEnd();
const input = rawInput.split('\n').map(l => parseInt(l));

for (let i = input.length - 1; i >= 0; i--)
for (let j = i - 1; j >= 0; j--)
for (let k = j - 1; k >= 0; k--) {
    if (input[i] + input[j] + input[k] === 2020) {
        console.log(input[i] * input[j] * input[k]);
    }
}