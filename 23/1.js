module.exports = function (input) {
    let cups = Array(10);
    for (let i = input.length - 1; i >= 0; i--) {
        const n = parseInt(input[i]);
        const m = parseInt(input[(i+1) % input.length]);
        const cup = {
            id: n,
            next: cups[m],
        }
        cups[n] = cup;
    }
    const lastCup = cups[parseInt(input[input.length-1])];
    let currentCup = cups[parseInt(input[0])];
    lastCup.next = currentCup;

    for (let round = 1; round <= 100; round++) {
        let takeOut = currentCup.next;
        currentCup.next = currentCup.next.next.next.next
        let destinationCup;
        for (let d = currentCup.id-1; true; d--) {
            if (d === 0) d = 9;
            if (d === takeOut.id || d === takeOut.next.id || d === takeOut.next.next.id) continue;
            destinationCup = cups[d];
            break;
        }
        takeOut.next.next.next = destinationCup.next;
        destinationCup.next = takeOut;
        currentCup = currentCup.next;
    }
    return printCups(cups[1]);
}

function printCups (currentCup) {
    let s = '';
    for (let i = 0; i < 8; i++) {
        s += currentCup.next.id;
        currentCup = currentCup.next
    }
    return s;
}