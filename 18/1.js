module.exports = function (input) {
    return input.split('\n').map(l => evaluate(l)).reduce((sum, x) => sum + x, 0);
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