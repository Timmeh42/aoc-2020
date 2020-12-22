module.exports = function (input) {
    let decks = input.match(/(\n\d+)+/g).map(s => s.trim().split('\n').map(n => parseInt(n)).reverse());
    return combat(decks[0], decks[1])[1];
}

function combat (deck1, deck2) {
    let memory = new Set();
    let winner = null;
    while (deck1.length && deck2.length) {
        let rwinner = false;
        let hash = deck1.join(' ') + '  ' + deck2.join(' ');
        if (memory.has(hash)) {
            winner = false;
            break;
        }
        let c1 = deck1.pop(),
            c2 = deck2.pop();
        if (c1 <= deck1.length && c2 <= deck2.length) {
            [rwinner] = combat(deck1.slice(-c1), deck2.slice(-c2));
        } else {
            rwinner = c2 > c1;
        }
        memory.add(hash);
        if (rwinner) {
            deck2.unshift(c1, c2);
        } else {
            deck1.unshift(c2, c1);
        }
    }
    if (winner === null) {
        winner = deck1.length === 0
    };
    let windeck = winner ? deck2 : deck1;
    let score = windeck.reduce((sum, c, i) => sum + c * (i + 1), 0);
    return [winner, score];
}
