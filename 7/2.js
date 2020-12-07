const fs = require('fs');
const rawInput = fs.readFileSync('input.txt', 'utf8').trimEnd();
const input = rawInput.split('\n');

const bags = new Map();
for (let bagString of input) {
    const bagName = bagString.match(/^\w+ \w+(?= bag)/g)[0];
    const innerBags = bagString.match(/\d+ \w+ \w+(?= bag)/g) || [];
    const newBag = {
        name: bagName,
        holds: innerBags.map(inn => [parseInt(inn[0]), inn.slice(2)]),
        count: null,
    }
    bags.set(bagName, newBag);
}

function countBag (name) {
    const bag = bags.get(name);
    if (bag.count) return bag.count;
    bag.count = bag.holds.reduce((c, b) => c + b[0] * countBag(b[1]), 1);
    return bag.count;
}

console.log(countBag('shiny gold') - 1);