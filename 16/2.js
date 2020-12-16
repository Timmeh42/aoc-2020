module.exports = function (input) {
    const sections = input.split('\n\n');
    const rangeRegex = /(?:(?<label>.+): (?<min1>\d+)-(?<max1>\d+) or (?<min2>\d+)-(?<max2>\d+))/;
    const ticketSize = sections[0].split('\n').length;
    const fields = sections[0]
                        .split('\n')
                        .map(l => {
                            let r = l.match(rangeRegex)
                            return {
                                label: r.groups.label,
                                min1: parseInt(r.groups.min1),
                                max1: parseInt(r.groups.max1),
                                min2: parseInt(r.groups.min2),
                                max2: parseInt(r.groups.max2),
                                pos: Array(ticketSize).fill(true),
                                final: null,
                            }
                        })
                        ;

    const legits = sections[2]
                        .split('\n')
                        .slice(1)
                        .map(s => s.split(',').map(x => parseInt(x)))
                        .filter(t => t.every(x => fields.some(f => (x >= f.min1 && x <= f.max1) || (x >= f.min2 && x <= f.max2) )))
                        ;

    let looseFields = fields;
    const usedPos = Array(ticketSize).fill(false);
    while (looseFields.length) {
        for (let ticket of legits) {
            for (let [pos, val] of ticket.entries()) {
                for (let field of looseFields) {
                    if ( !((val >= field.min1 && val <= field.max1) || (val >= field.min2 && val <= field.max2)) || usedPos[pos] === true) {
                        field.pos[pos] = false;
                    }
                }
            }
        }
    
        for (let field of looseFields) {
            if (field.pos.filter(p => p === true).length === 1) {
                const final = field.pos.findIndex(p => p === true);
                field.final = final;
                usedPos[final] = field;
            }
        }
    
        looseFields = looseFields.filter(f => f.final === null);
        looseFields.forEach(f => f.pos = f.pos.map((p, i) => p === true && usedPos[i] === false));
    }

    return sections[1].split('\n')[1].split(',').map(n => parseInt(n))
                .filter((v, i) => usedPos[i].label.startsWith('departure'))
                .reduce((mul, n) => mul * n, 1)
}
