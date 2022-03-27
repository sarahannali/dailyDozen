import { DocumentReference } from 'firebase/firestore/lite';
import { RecipeIngredient, Macros } from '../../recipes/Recipe';

export type MealTime = 'Breakfast' | 'Lunch' | 'Dinner';

export type MealEventRecipe = {
  id?: string,
  name: string,
  macros: Macros,
  ingredients: RecipeIngredient[],
  servings: number,
}

type MealEvent = {
  id?: string,
  Date: {
    seconds: number,
    milliseconds: number
  },
  MealTime: 'Breakfast' | 'Lunch' | 'Dinner',
  Recipe?: DocumentReference,
  RecipeInfo: MealEventRecipe,
  Servings: number
}

export default MealEvent;
