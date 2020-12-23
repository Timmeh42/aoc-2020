module.exports = function (input) {
    input = input.split('').map(n => parseInt(n));
    let cups = new Int32Array(1_000_001);
    for (let j = 10; j < 1_000_000; j++) {
        cups[j] = j+1;
    }
    for (let i = input.length - 1; i >= 0; i--) {
        cups[input[i]] = input[i + 1];
    }
    cups[input[input.length - 1]] = 10;
    let currentCup = input[0];
    cups[1_000_000] = currentCup;

    for (let round = 1; round <= 10_000_000; round++) {
        const takeOut = cups[currentCup];
        const takeOut2 = cups[takeOut];
        const takeOut3 = cups[takeOut2];
        cups[currentCup] = cups[takeOut3];
        let destinationCup = currentCup;
        do {
            if (--destinationCup === 0) destinationCup = 1_000_000;
        } while (destinationCup === takeOut || destinationCup === takeOut2 || destinationCup === takeOut3);
        cups[takeOut3] = cups[destinationCup];
        cups[destinationCup] = takeOut;
        currentCup = cups[currentCup];
    }
    return cups[1] * cups[cups[1]];
}
