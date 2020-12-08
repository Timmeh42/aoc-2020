const fs = require('fs');
const rawInput = fs.readFileSync('input.txt', 'utf8').trimEnd();
let input = rawInput.split('\n');

let acc = 0;
let pnt = 0;

let ran = [];
let tested = [];

while (true) {
    const instr = input[pnt];
    if (ran.includes(pnt)) {
        console.log('Program failed');
        break;
    }
    if (pnt === input.length) {
        console.log('Program ended');
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
    input = rawInput.split('\n');
    if (tested.length === ran.length) {
        console.log('Replacement failed');
        break;
    }
    for (let i = ran.length - 1; i>= 0; i--) {
        let p = ran[i];
        if (!tested.includes(p)) {
            tested.push(p);
            if (input[p].slice(0, 3) === 'jmp') {
                input[p] = 'nop' + input[p].slice(3);
                console.log('changed', p);
                break;
            } else if (input[p].slice(0, 3) === 'nop') {
                input[p] = 'jmp' + input[p].slice(3);
                console.log('changed', p);
                break;
            }
        }
    }

    pnt = 0;
    acc = 0;
    ran = [];
    while (true) {
        const instr = input[pnt];
        if (ran.includes(pnt)) {
            console.log('Program failed', pnt);
            break;
        }
        if (pnt === input.length) {
            console.log('Program ended');
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
console.log(acc);