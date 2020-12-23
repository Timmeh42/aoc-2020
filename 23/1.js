module.exports = function (input) {
    let cups = new Int32Array(10);
    for (let i = input.length - 1; i >= 0; i--) {
        const n = parseInt(input[i]);
        const m = parseInt(input[(i+1) % input.length]);
        cups[n] = m;
    }
   
    let currentCup = parseInt(input[0]);
    cups[parseInt(input[input.length-1])] = currentCup;

    for (let round = 1; round <= 100; round++) {
        let takeOut = cups[currentCup];
        cups[currentCup] = cups[cups[cups[cups[currentCup]]]];
        let destinationCup = currentCup;
        do {
            destinationCup--;
            if (destinationCup === 0) destinationCup = 9;
        } while (destinationCup === takeOut || destinationCup === cups[takeOut] || destinationCup === cups[cups[takeOut]]);
        cups[cups[cups[takeOut]]] = cups[destinationCup];
        cups[destinationCup] = takeOut;
        currentCup = cups[currentCup];
    }
    return printCups(cups);
}

function printCups (cups) {
    let s = '';
    let cup = 1;
    for (let i = 0; i < 8; i++) {
        cup = cups[cup];
        s += cup;
    }
    return s;
}