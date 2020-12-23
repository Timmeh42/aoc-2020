module.exports = function (input) {
    let cups = Array(1_000_000);
    for (let j = 1_000_000; j >= 10; j--) {
        cups[j] = j+1;
    }
    for (let i = input.length - 1; i >= 0; i--) {
        const n = parseInt(input[i]);
        const m = parseInt(input[(i+1) % input.length]);
        cups[n] = m;
    }
    cups[parseInt(input[input.length-1])] = 10;
    let currentCup = parseInt(input[0]);
    cups[1_000_000] = currentCup;

    for (let round = 1; round <= 10_000_000; round++) {
        let takeOut = cups[currentCup];
        cups[currentCup] = cups[cups[cups[cups[currentCup]]]];
        let destinationCup = currentCup;
        while (true) {
            destinationCup--;
            if (destinationCup === 0) destinationCup = 1_000_000;
            if (destinationCup !== takeOut && destinationCup !== cups[takeOut] && destinationCup !== cups[cups[takeOut]]) break;
        }
        cups[cups[cups[takeOut]]] = cups[destinationCup];
        cups[destinationCup] = takeOut;
        currentCup = cups[currentCup];
    }
    return cups[1] * cups[cups[1]];
}
