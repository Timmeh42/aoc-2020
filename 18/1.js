module.exports = function (input) {
    return input.split('\n')
                .map(l => l.replace(/\s/g, ''))
                .map(l => evaluate(l))
                .reduce((sum, x) => sum + x, 0);
}

function evaluate (line, index = 0) {
    let value = 0;
    let mode;
    while (index < line.length) {
        const char = line[index];
        if (char === '+' || char === '*') {
            mode = char;
        } else if (char === ')') {
            return [value, index];
        } else {
            let val;
            if (char === '(') {
                [val, index] = evaluate(line, index + 1);
            } else {
                val = parseInt(char);
            }
            if (mode === '+') {
                value += val;
            } else if (mode === '*') {
                value *= val;
            } else {
                value = val;
            }
        }
        index++;
    }
    return value;
}