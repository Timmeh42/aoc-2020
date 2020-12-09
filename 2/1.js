module.exports = function (input) {
    return input.reduce((n, line) => {
            let [_, min, max, char, password] = line.match(/(\d+)-(\d+) (\w): (\w+)/i).map((s, i) => i === 1 || i === 2 ? parseInt(s) : s);
            let count = (password.match(new RegExp(char, 'g')) || []).length;
            if (min <= count && max >= count) {
                return n+1;
            } else {
                return n;
            }
        }, 0);    
}