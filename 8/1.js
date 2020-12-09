module.exports = function (input) {
    input = input.split('\n');
    let acc = 0;
    let pnt = 0;

    while (true) {
        const instr = input[pnt];
        if (!instr) break;
        input[pnt] = null;
        const code = instr.slice(0, 3);
        const num = parseInt(instr.slice(4));

        switch (code) {
            case 'jmp': {
                pnt += num - 1;
                break;
            }
            case 'acc': {
                acc += num;
                break;
            }
        }
        pnt += 1;
    }
    return acc;
}