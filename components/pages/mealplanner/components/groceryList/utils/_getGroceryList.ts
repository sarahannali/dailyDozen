import { Calendar, Meals } from '../../../utils/_populateCalendar';
import { ConvertAmount } from './_convertAmount';
import { GroceryItem } from '../../../../../../utils/propTypes';

const UpdateGroceryList = (groceryList: GroceryItem[], days: Calendar) => {
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

  const ingredients: GroceryItem[] = [];

  ingredientMap.forEach((value, key) => {
    const groceryIngredient = groceryList.find((entry) => entry.name === key);

    if (groceryIngredient) {
      const { amountType } = groceryIngredient;

      const amount = ConvertAmount(
        value.amount,
        'g',
        amountType,
        value.ratio,
      );

      ingredients.push({
        name: key,
        amount,
        amountType,
        checked: false,
        ratio: value.ratio,
      });
    } else {
      ingredients.push({
        name: key,
        amount: value.amount,
        amountType: 'g',
        checked: false,
        ratio: value.ratio,
      });
    }
  });

  return ingredients;
};

export default UpdateGroceryList;
