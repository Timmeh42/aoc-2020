module.exports = function (input) {
    return input.split('\n')
            .map(b => parseInt(b.replace(/F|L/g, '0').replace(/B|R/g, '1'), 2))
            .sort((a, b) => a - b)
            .find((v, i, s) => s[i-1] === v-2)
            - 1
        ;
}
