module.exports = function (input) {
    let [doorKey, cardKey] = input.split('\n').map(n => parseInt(n));
    let doorloops = 0;
    let doorReplica = 1;
    while (++doorloops) {
        doorReplica *= 7;
        doorReplica %= 20201227;
        if (doorReplica === doorKey) {
            break;
        }
    }

    let cardloops = 0;
    let cardReplica = 1;
    while (++cardloops) {
        cardReplica *= 7;
        cardReplica %= 20201227;
        if (cardReplica === cardKey) {
            break;
        }
    }

    let secret = 1;
    for (let i = 0; i < cardloops; i++) {
        secret *= doorReplica;
        secret %= 20201227;
    }
    return secret;
}
