const ConvertGramsToUnits = (ingredientName, amount, allIngredientData) => {
  const ingr = allIngredientData.find(ingr => ingr.name == ingredientName);

  return (amount / ingr.ratio).toFixed(2) + " cup(s)";
};

const GetGroceryList = (days, allIngredientData) => {
  const ingredientMap = new Map();

  days.forEach(day => {
    day.meals.forEach(meal => {
      meal.recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
          if (ingredientMap[ingredient.name]) ingredientMap[ingredient.name] += ingredient.grams;
          else ingredientMap[ingredient.name] = ingredient.grams;
        })
      })
    })
  });

  const ingredients = [];

  Object.keys(ingredientMap).forEach(key => {
    ingredients.push({
      "name": key,
      "amount": ConvertGramsToUnits(key, ingredientMap[key], allIngredientData)
    });
  });

  return ingredients;
};

export default GetGroceryList;