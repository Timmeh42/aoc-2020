module.exports = function (input) {
    input = input.split('\n\n');
    return input.filter(p => ((p + ' ').match(/byr:(19[2-9][0-9]|200[0-2])\s|iyr:(201[0-9]|2020)\s|eyr:(202[0-9]|2030)\s|hgt:((1[5-8][0-9]|19[0-3])cm|(59|6[0-9]|7[0-6])in)\s|hcl:#[0-9a-f]{6}\s|ecl:(amb|blu|brn|gry|grn|hzl|oth)\s|pid:\d{9}\s/g) || []).length === 7).length;
}
