module.exports = function (input) {
    let foods = [];
    let allergensList = new Map();
    for (let line of input.split('\n')) {
        const list = line.match(/(?<ingredients>(?:\w+\s?)+)( \(contains (?<allergens>.+)\))?$/).groups;
        const ingredients = list.ingredients.trim().split(' ');
        const allergens = list.allergens.trim().split(', ');
        foods.push({ingredients, allergens});
        for (let allergen of allergens) {
            const possibles = allergensList.get(allergen) || ingredients;
            allergensList.set(allergen, possibles.filter(i => ingredients.includes(i)));
        }
    }

    const knownAllergens = new Map();
    while (allergensList.size) {
        for (let [allergen, ingredients] of allergensList.entries()) {
            let tempIngredients = ingredients.filter(i => !knownAllergens.has(i));
            if (tempIngredients.length === 1) {
                knownAllergens.set(tempIngredients[0], allergen);
                allergensList.delete(allergen);
                break;
            }
        }
    }
    
    return foods.reduce((sum, food) => sum + food.ingredients.filter(i => !knownAllergens.has(i)).length, 0);
}
