module.exports = function (input) {
    let cups = new Map();
    for (let j = 1_000_000; j >= 10; j--) {
        const cup = {
            id: j,
            next: cups.get(j+1),
        }
        cups.set(j, cup);
    }
    for (let i = input.length - 1; i >= 0; i--) {
        const n = parseInt(input[i]);
        const m = parseInt(input[(i+1) % input.length]);
        const cup = {
            id: n,
            next: cups.get(m),
        }
        cups.set(n, cup);
    }
    const lastCup = cups.get(parseInt(input[input.length-1]));
    lastCup.next = cups.get(10);
    let currentCup = cups.get(parseInt(input[0]));
    cups.get(1_000_000).next = currentCup;

    for (let round = 1; round <= 10_000_000; round++) {
        let takeOut = currentCup.next;
        currentCup.next = currentCup.next.next.next.next
        let destinationCup;
        for (let d = currentCup.id-1; true; d--) {
            if (d === 0) d = 1_000_000;
            if (d === takeOut.id || d === takeOut.next.id || d === takeOut.next.next.id) continue;
            if (cups.has(d)) {
                destinationCup = cups.get(d);
                break;
            }
        }
        takeOut.next.next.next = destinationCup.next;
        destinationCup.next = takeOut;
        currentCup = currentCup.next;
    }
    return printCups(cups.get(1));
}

function printCups (currentCup) {
    return currentCup.next.id * currentCup.next.next.id;
}