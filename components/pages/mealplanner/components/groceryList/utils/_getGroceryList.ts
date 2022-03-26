import { Calendar, Meals } from '../../../utils/_populateCalendar';
import { ConvertAmount } from './_convertAmount';
import { GroceryItem } from 'utils/propTypes/db';

const getIngredientToGramsMap = (days: Calendar) => {
  const ingredientMap = new Map<string, {amount: number, ratio: number}>();

  days.forEach((day) => {
    (Object.keys(day.meals) as Array<keyof Meals>).forEach((key) => {
      day.meals[key].forEach((mealEvent) => {
        mealEvent.RecipeInfo.ingredients.forEach((ingredient) => {
          const amountNeeded = (
            ingredient.grams / mealEvent.RecipeInfo.servings
          ) * mealEvent.Servings;
          if (ingredientMap.has(ingredient.name)) {
            ingredientMap.get(ingredient.name)!.amount += amountNeeded;
          } else {
            ingredientMap.set(ingredient.name, {
              amount: amountNeeded,
              ratio: ingredient.ratio,
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
    const { amountType } = groceryIngredient;

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
      checked: !!(groceryIngredient.checked && amount <= groceryIngredient.amount),
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
