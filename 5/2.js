const fs = require('fs');
const rawInput = fs.readFileSync('input.txt', 'utf8').trimEnd();

const seat = rawInput
                .split('\n')
                .map(b => parseInt(b.replace(/F|L/g, '0').replace(/B|R/g, '1'), 2))
                .sort((a, b) => a - b)
                .find((v, i, s) => s[i-1] === v-2)
                - 1
            ;
console.log(seat);
