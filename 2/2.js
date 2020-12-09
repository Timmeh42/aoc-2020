module.exports = function (input) {
    return input.split('\n')
        .reduce((n, line) => {
            let [_, min, max, char, password] = line.match(/(\d+)-(\d+) (\w): (\w+)/i).map((s, i) => i === 1 || i === 2 ? parseInt(s) : s);
            if (password[min-1] === char ^ password[max-1] === char) {
                return n+1;
            } else {
                return n;
            }
        }, 0);
}
