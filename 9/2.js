module.exports = function (input) {
    input = input.map(i => parseInt(i));
    let preamble = 25;
    const adds = new Set();

    let invalid;

    for (let m = 0; m < input.length; m++) {
        const n = input[m]
        if (preamble === 0) {
            if ([...adds.values()].find(a => adds.has(n - a))) {
                adds.add(n);
                adds.delete(adds.values().next().value);
            } else {
                invalid = n;
                break;
            }
        } else {
            adds.add(n);
            preamble--;
        }
    }

    let start = 0;
    let end = 0;
    let rangeSum = 0;

    while (rangeSum !== invalid) {
        if (rangeSum < invalid || end-start <= 2) {
            rangeSum += input[end];
            end++;
        }
        if (rangeSum > invalid && end-start > 2) {
            rangeSum -= input[start];
            start++;
        }
        if (end >= input.length) {
            console.log('failed');
            break;
        }
    }
    return Math.max(...input.slice(start, end)) + Math.min(...input.slice(start, end));
}
