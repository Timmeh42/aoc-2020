module.exports = function (input) {
    input = input.split('\n\n');
    return (input.filter(p => p.match(/byr|iyr|eyr|hgt|hcl|ecl|pid/g).length === 7)).length;
}
