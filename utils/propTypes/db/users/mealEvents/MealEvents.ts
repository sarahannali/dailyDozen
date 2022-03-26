import { DocumentReference } from 'firebase/firestore/lite';
import { RecipeIngredient, Macros } from '../../recipes/Recipe';

export interface MealEventRecipe {
  recipeID?: string,
  name: string,
  macros: Macros,
  ingredients: RecipeIngredient[],
  servings: number,
}

interface MealEvent {
  id?: string,
  Date: Date,
  MealTime: 'Breakfast' | 'Lunch' | 'Dinner',
  Recipe?: DocumentReference,
  RecipeInfo: MealEventRecipe,
  Servings: number
}

export default MealEvent;
