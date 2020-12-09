module.exports = function (input) {
    input = input.split('\n\n');
    let count = 0;
    for (let group of input) {
        let lines = group.split('\n');
        alph: for (let c of 'abcdefghijklmnopqrstuvwxyz'.split('')) {
            for (let line of lines) {
                if (!line.split('').includes(c)) {
                    continue alph;
                }
            }
            count++;
        }
        
    }
    return count;
}