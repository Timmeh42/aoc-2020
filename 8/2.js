module.exports = function (input) {
    let acc = 0;
    let pnt = 0;

    let ran = [];
    let tested = [];

    while (true) {
        const instr = input[pnt];
        if (ran.includes(pnt)) {
            break;
        }
        if (pnt === input.length) {
            break;
        }
        const code = instr.slice(0, 3);
        const num = parseInt(instr.slice(4));

        ran.push(pnt);
        switch (code) {
            case 'jmp': {
                pnt += num - 1;
                break;
            }
            case 'acc': {
                acc += num;
                break;
            }
            case 'nop': {
                break;
            }
        }
        pnt += 1;
    }

    outer: while (true) {
        let inp = [...input];
        if (tested.length === ran.length) {
            break;
        }
        for (let i = ran.length - 1; i>= 0; i--) {
            let p = ran[i];
            if (!tested.includes(p)) {
                tested.push(p);
                if (inp[p].slice(0, 3) === 'jmp') {
                    inp[p] = 'nop' + inp[p].slice(3);
                    break;
                } else if (inp[p].slice(0, 3) === 'nop') {
                    inp[p] = 'jmp' + inp[p].slice(3);
                    break;
                }
            }
        }

        pnt = 0;
        acc = 0;
        ran = [];
        while (true) {
            const instr = inp[pnt];
            if (ran.includes(pnt)) {
                break;
            }
            if (pnt === inp.length) {
                break outer;
            }
            const code = instr.slice(0, 3);
            const num = parseInt(instr.slice(4));

            ran.push(pnt);
            switch (code) {
                case 'jmp': {
                    pnt += num - 1;
                    break;
                }
                case 'acc': {
                    acc += num;
                    break;
                }
                case 'nop': {
                    break;
                }
            }
            pnt += 1;
        }


    }
    return acc;
}