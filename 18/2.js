module.exports = function (input) {
    return input.split('\n').map(l => evaluate(parenthesise(l))).reduce((sum, x) => sum + x, 0);
}

function parenthesise (line, index = 0) {
    index = line.indexOf('+', index);
    let left, right;
    if (index === -1) {
        return line;
    } else {
        left = index - 1;
        right = index + 1;
        let parenlevel = 0;
        stepleft: while (left > 0) {
            switch (line[left]) {
                case ' ': {
                    break;
                }
                case ')': {
                    parenlevel++;
                    break;
                }
                case '(': {
                    parenlevel--;
                }
                default: {
                    if (parenlevel === 0) {
                        break stepleft;
                    }
                }
            }
            left--;
        }
        parenlevel = 0;
        stepright: while (right < line.length) {
            switch (line[right]) {
                case ' ': {
                    break;
                }
                case '(': {
                    parenlevel++;
                    break;
                }
                case ')': {
                    parenlevel--;
                }
                default: {
                    if (parenlevel === 0) {
                        break stepright;
                    }
                }
            }
            right++;
        }
        line = line.slice(0, left) + '(' + line.slice(left, right + 1) + ')' + line.slice(right + 1);
    }
    return parenthesise(line, index + 2)
}

function evaluate (line, index = 0) {
    let value = 0;
    let mode;
    while (index < line.length) {
        switch (line[index]) {
            case ' ': {
                break;
            }
            case '+':
            case '-':
            case '*':
            case '/': {
                mode = line[index];
                break;
            }
            case ')': {
                return [value, index]
                break;
            }
            default: {
                let val;
                if (line[index] === '(') {
                    [val, index] = evaluate(line, index + 1);
                } else {
                    val = parseInt(line[index])
                }
                switch (mode) {
                    case '+': {
                        value += val;
                        break;
                    }
                    case '-': {
                        value -= val;
                        break;
                    }
                    case '*': {
                        value *= val;
                        break;
                    }
                    case '/': {
                        value /= val;
                        break;
                    }
                    default: {
                        value = val;
                        break;
                    }
                }
                break;
            }
        }
        index++;
    }
    return value;
}