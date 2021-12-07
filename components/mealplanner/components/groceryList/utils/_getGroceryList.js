const ConvertGramsToUnits = (amountInGrams, ratio) => {
  const amountInCups = amountInGrams / ratio;
  let amount = amountInCups;
  let amountType = "cup"
  
  if (amountInCups < .25) {
    amount = amountInCups * 16;
    amountType = "tbs";

    if (amount < .3) {
      amount = amount * 3;
      amountType = "tsp";
    }
  } else if (amountInCups > 16) {
    amount = amountInCups / 16;
    amountType = "gal"
  }

  return [amount, amountType];
};

const typesInCups = {
  "gal": 16,
  "cup": 1,
  "tbs": 0.0625,
  "tsp": (1/48)
}

export const ConvertAmount = (amount, orgType, newType) => {
  const amountInCups = amount * typesInCups[orgType];

  return amountInCups * (1 / typesInCups[newType]);
}

const GetGroceryList = (days) => {
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