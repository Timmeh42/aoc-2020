const fs = require('fs');
const rawInput = fs.readFileSync('input.txt', 'utf8').trimEnd();
const input = rawInput.split('\n');

const bags = new Map();
for (let bagString of input) {
    const bagName = bagString.match(/^\w+ \w+(?= bag)/g)[0];
    const innerBags = bagString.match(/\d+ \w+ \w+(?= bag)/g) || [];
    const newBag = {
        name: bagName,
        holds: innerBags.map(inn => inn.slice(2)),
        heldby: new Set(),
        counted: false,
    }
    bags.set(bagName, newBag);
}

bags.forEach(bag => bag.holds.forEach(name => bags.get(name).heldby.add(bag)))


let count = 0;

let allParents = [];
const shiny_gold = bags.get('shiny gold');
const holders = [...shiny_gold.heldby.values()].filter(b => !b.counted)
allParents.push(...holders);
shiny_gold.counted = true;

while (allParents.length) {
    let newParents = [];
    for (let i = allParents.length - 1; i >= 0; i--) {
        let bag = allParents[i];
        if (!bag.counted) {
            let holders = [...bag.heldby.values()].filter(b => !b.counted);
            newParents.push(...holders);
            bag.counted = true;
            count ++;
        }
    }
    allParents = newParents;
}
console.log(count)
