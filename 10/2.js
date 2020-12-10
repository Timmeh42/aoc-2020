module.exports = function (input) {
    input = input.split('\n').map(i => parseInt(i)).sort((a, b) => a - b);
    input.unshift(0);
    return checkCharger(0, input, new Map());
}

function checkCharger (i, input, pathCounts) {
    let paths = 0;
    if (i === input.length - 1) {
        return true;
    }
    if (pathCounts.has(i)) {
        return pathCounts.get(i);
    }
    let j = i;
    while (++j) {
        if (input[j] && input[j] - input[i] <= 3) {
            paths += checkCharger(j, input, pathCounts);
        } else {
            break;
        }
    }
    pathCounts.set(i, paths);
    return paths;
}
