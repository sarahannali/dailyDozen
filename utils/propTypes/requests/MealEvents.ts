import { Ingredient, Macros } from '../db/Recipe';

export interface MealEventRecipe {
  recipeID: string,
  imageURL: string,
  name: string,
  macros: Macros,
  ingredients: Ingredient[],
  servings: number,
}

interface MealEventResponse {
  id: string,
  Date: Date,
  MealTime: 'Breakfast' | 'Lunch' | 'Dinner',
  Recipe: MealEventRecipe,
  Servings: number,
}

export default MealEventResponse;
