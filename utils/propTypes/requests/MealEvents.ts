import { MealEventRecipe } from '../db';

type MealEventResponse = {
  id: string,
  Date: Date,
  MealTime: 'Breakfast' | 'Lunch' | 'Dinner',
  Recipe: MealEventRecipe,
  Servings: number,
}

export default MealEventResponse;
