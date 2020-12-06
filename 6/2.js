const fs = require('fs');
const rawInput = fs.readFileSync('input.txt', 'utf8').trimEnd();
const groups = rawInput.split('\n\n');

let count = 0;
for (let group of groups) {
    let lines = group.split('\n');
    alph: for (let c of 'abcdefghijklmnopqrstuvwxyz'.split('')) {
        for (let line of lines) {
            if (!line.split('').includes(c)) {
                continue alph;
            }
        }
        count++;
    }
    
}

console.log(count);