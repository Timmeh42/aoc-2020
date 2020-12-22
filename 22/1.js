module.exports = function (input) {
    let decks = input.match(/(\n\d+)+/g).map(s => s.trim().split('\n').map(n => parseInt(n)).reverse());
    for (let turn = 1; decks[0].length && decks[1].length; turn++) {
        let p1 = decks[0].pop();
        let p2 = decks[1].pop();
        if (p1 > p2) {
            decks[0].unshift(p2, p1);
        } else {
            decks[1].unshift(p1, p2);
        }
    }
    let winner = decks[0].length ? decks[0] : decks[1];
    return winner.reduce((sum, c, i) => sum + c * (i + 1), 0);
}
