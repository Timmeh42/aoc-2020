module.exports = function (input) {
    return input.split('\n')
                .map(l => l.replace(/\s/g, ''))
                .map(l => evaluate(parenthesise(l)))
                .reduce((sum, x) => sum + x, 0);
}

function parenthesise (line, index = 0) {
    index = line.indexOf('+', index);
    if (index === -1) {
        return line;
    }
    let left = index - 1;
    let right = index + 1;
    let parenlevel = 0;
    while (left >= 0) {
        const char = line[left];
        if (char === ')') {
            parenlevel++;
        }
        if (char === '(') {
            parenlevel--;
        }
        if (parenlevel === 0) {
            break;
        }
        left--;
    }
    while (right < line.length) {
        const char = line[right];
        if (char === ')') {
            parenlevel--;
        }
        if (char === '(') {
            parenlevel++;
        }
        if (parenlevel === 0) {
            break;
        }
        right++;
    }
    line = line.slice(0, left) + '(' + line.slice(left, right + 1) + ')' + line.slice(right + 1);
    
    return parenthesise(line, index + 2)
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