module.exports = function (input) {
    let decks = input.match(/(\n\d+)+/g).map(s => s.trim().split('\n').map(n => parseInt(n)).reverse());
    return combat(decks[0], decks[1], true);
}

function combat (deck1, deck2, orig = false) {
    const memory = new Set();
    let gameWinner = null;
    while (deck1.length !== 0 && deck2.length !== 0) {
        let roundWinner = false;
        const hash = deck1.reduce((sum, c, i) => sum + c * (i + 1), 0) + 100000 * deck2.reduce((sum, c, i) => sum + c * (i + 1), 0);
        if (memory.has(hash)) {
            gameWinner = false;
            break;
        }
        memory.add(hash);
        const c1 = deck1.pop(),
            c2 = deck2.pop();
        if (c1 <= deck1.length && c2 <= deck2.length) {
            roundWinner = combat(deck1.slice(-c1), deck2.slice(-c2));
        } else {
            roundWinner = c2 > c1;
        }
        if (roundWinner) {
            deck2.unshift(c1, c2);
        } else {
            deck1.unshift(c2, c1);
        }
    }
    if (gameWinner === null) {
        gameWinner = deck1.length === 0;
    };
    if (orig) {
        return (gameWinner ? deck2 : deck1).reduce((sum, c, i) => sum + c * (i + 1), 0);
    } else {
        return gameWinner;
    }
}
