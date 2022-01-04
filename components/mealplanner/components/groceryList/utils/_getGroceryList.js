import { ConvertGramsToUnits } from "../../../../common";

const UpdateGroceryList = (groceryList, days) => {
  // when days updates, just add it to the amount, don't change the amount type
  // when amount type changes, then adjust that
  return GetGroceryList(days, groceryList);
}

const GetGroceryList = (days, groceryList) => {
  const ingredientMap = new Map();

  days.forEach(day => {
    Object.keys(day.meals).forEach(key => {
      day.meals[key].forEach(mealEvent => {
        mealEvent.RecipeInfo.ingredients.forEach(ingredient => {
          const amountNeeded = ingredient.grams * mealEvent.Servings;
          if (ingredientMap[ingredient.name]) ingredientMap[ingredient.name].amount += amountNeeded;
          else ingredientMap[ingredient.name] = {amount: amountNeeded, ratio: ingredient.ratio};
        })
      })
    })
  });

  const ingredients = [];

  Object.keys(ingredientMap).forEach(key => {
    const groceryIngredient = groceryList.find(entry => entry.name == key);

    if (ingredientMap[key].amount != 0) {
      const [amount, amountType] = ConvertGramsToUnits(ingredientMap[key].amount, ingredientMap[key].ratio, groceryIngredient ? groceryIngredient.amountType : null);

      ingredients.push({
        "name": key,
        "amount": amount,
        "amountType": amountType,
        "checked": groceryIngredient ? groceryIngredient.checked : false
      });
    }
  });

  return ingredients;
};

export default UpdateGroceryList;