module.exports = function (input) {
    const sections = input.split('\n\n');
    const rawRules = sections[0].split('\n');
    const rules = [];
    const builds = [];
    for (let rawRule of rawRules) {
        let id;
        [id, rawRule] = rawRule.split(': ');
        id = parseInt(id);
        if (rawRule[0] === '"') {
            rules[id] = rawRule[1];
            builds[id] = rawRule[1];
        } else {
            let groups = rawRule.split(' | ');
            rules[id] = groups.map(g => g.split(' ').map(n => parseInt(n)));
        }
    }
    let regex = new RegExp('^' + buildRule(0, rules, builds) + '$');
    return sections[1].split('\n').filter(s => regex.test(s)).length;
}

function buildRule (id, rules, builds) {
    if (builds[id]) {
        return builds[id];
    }
    const rule = rules[id];
    let ruleString = '(?:' + rule.map(g => '(?:' + g.map(i => buildRule(i, rules, builds)).join('') + ')').join('|') + ')';
    builds[id] = ruleString;
    return ruleString;
}