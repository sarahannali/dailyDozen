import type { Calendar, Meals } from 'components/pages/mealplanner/types';
import type { GroceryItem } from 'utils/propTypes/db';
import ConvertAmount from './_convertAmount';

const getIngredientToGramsMap = (days: Calendar) => {
  const ingredientMap = new Map<string, {amount: number, ratio: number}>();

  days.forEach((day) => {
    (Object.keys(day.meals) as Array<keyof Meals>).forEach((key) => {
      day.meals[key].forEach((mealEvent) => {
        mealEvent.RecipeInfo.ingredients.forEach((ingredient) => {
          const { grams, name, ratio } = ingredient;

          const amountNeeded = (
            grams / mealEvent.RecipeInfo.servings
          ) * mealEvent.Servings;

          if (ingredientMap.has(name)) {
            ingredientMap.get(name)!.amount += amountNeeded;
          } else {
            ingredientMap.set(name, {
              amount: amountNeeded,
              ratio,
            });
          }
        });
      });
    });
  });

  return ingredientMap;
};

const convertIngredientToSelectedType = (
  name: string,
  amount: number,
  ratio: number,
  groceryList: GroceryItem[],
): GroceryItem => {
  const groceryIngredient = groceryList.find((entry) => entry.name === name);

  if (groceryIngredient) {
    const { amountType, checked } = groceryIngredient;

    const newAmount = ConvertAmount(
      amount,
      'g',
      amountType,
      ratio,
    );

    return {
      name,
      amount: newAmount,
      amountType,
      checked: !!(checked && amount <= groceryIngredient.amount),
      ratio,
    };
  }

  return {
    name,
    amount,
    amountType: 'g',
    checked: false,
    ratio,
  };
};

const UpdateGroceryList = (groceryList: GroceryItem[], days: Calendar) => {
  const ingredientMap = getIngredientToGramsMap(days);

  const ingredients: GroceryItem[] = [];

  ingredientMap.forEach((value, key) => {
    const ingredientGroceryItem = convertIngredientToSelectedType(
      key,
      value.amount,
      value.ratio,
      groceryList,
    );

    ingredients.push(ingredientGroceryItem);
  });

  return ingredients;
};

export default UpdateGroceryList;
