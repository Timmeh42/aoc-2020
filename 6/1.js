const fs = require('fs');
const rawInput = fs.readFileSync('input.txt', 'utf8').trimEnd();
const groups = rawInput.split('\n\n');

let count = 0;
for (let group of groups) {
    for (let c of 'abcdefghijklmnopqrstuvwxyz'.split('')) {
        if (group.split('').includes(c)) {
            count++;
        }
    }
}

console.log(count);
