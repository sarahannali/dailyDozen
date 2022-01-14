/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ConvertGramsToUnits } from '../../../../common';
import { GroceryItem } from '../../../../../utils/propTypes';
import { Calendar, Meals } from '../../../utils/_populateCalendar';

const UpdateGroceryList = (groceryList: GroceryItem[], days: Calendar) => {
  const ingredientMap = new Map<string, {amount: number, ratio: number}>();

  days.forEach((day) => {
    (Object.keys(day.meals) as Array<keyof Meals>).forEach((key) => { // todo: change to reduce
      day.meals[key].forEach((mealEvent) => {
        mealEvent.RecipeInfo.ingredients.forEach((ingredient) => {
          const amountNeeded = ingredient.grams * mealEvent.Servings;
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

  Object.keys(ingredientMap).forEach((key) => {
    const groceryIngredient = groceryList.find((entry) => entry.name === key);

    if (ingredientMap.get(key)?.amount !== 0) {
      const [amount, amountType] = ConvertGramsToUnits(
        ingredientMap.get(key)!.amount,
        ingredientMap.get(key)!.ratio,
        groceryIngredient ? groceryIngredient.amountType : '',
      );

      ingredients.push({
        name: key,
        amount,
        amountType,
        checked: groceryIngredient ? groceryIngredient.checked : false,
      });
    }
  });

  return ingredients;
};

export default UpdateGroceryList;
