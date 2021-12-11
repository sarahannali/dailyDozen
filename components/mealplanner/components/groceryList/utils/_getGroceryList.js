import { ConvertGramsToUnits } from "../../../../common";

const GetGroceryList = (days) => {
  console.log("GETTING GROCERY LIST")
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
    if (ingredientMap[key].amount != 0) {
      const [amount, amountType] = ConvertGramsToUnits(ingredientMap[key].amount, ingredientMap[key].ratio);
      ingredients.push({
        "name": key,
        "amount": amount,
        "amountType": amountType
      });
    }
  });

  return ingredients;
};

export default GetGroceryList;