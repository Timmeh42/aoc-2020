module.exports = function (input) {
    input = input.split('').map(n => parseInt(n));
    let cups = new Int32Array(10);
    for (let i = input.length - 1; i >= 0; i--) {
        cups[input[i]] = input[i + 1];
    }
   
    let currentCup = input[0];
    cups[input[input.length-1]] = currentCup;

    for (let round = 1; round <= 100; round++) {
        const takeOut = cups[currentCup];
        const takeOut2 = cups[takeOut];
        const takeOut3 = cups[takeOut2];
        cups[currentCup] = cups[takeOut3];
        let destinationCup = currentCup;
        do {
            if (--destinationCup === 0) destinationCup = 9;
        } while (destinationCup === takeOut || destinationCup === takeOut2 || destinationCup === takeOut3);
        cups[takeOut3] = cups[destinationCup];
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