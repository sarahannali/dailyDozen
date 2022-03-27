import type { MealEventRecipe } from 'utils/propTypes/db';

export type Meal = {
  id?: string,
  RecipeInfo: MealEventRecipe,
  Servings: number
}

export type Meals = {
  Breakfast: Meal[],
  Lunch: Meal[],
  Dinner: Meal[]
}
