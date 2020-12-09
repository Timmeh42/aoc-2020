module.exports = function (input) {
    input = input.map(i => parseInt(i));
    let preamble = 25;
    const adds = new Set();
    
    for (let m = 0; m < input.length; m++) {
        const n = input[m]
        if (preamble !== 0) {
            adds.add(n);
            preamble--;
        } else {
            if ([...adds.values()].find(a => adds.has(n - a))) {
                adds.add(n);
                adds.delete(adds.values().next().value);
            } else {
                return n;
            }
        }
    }
}
