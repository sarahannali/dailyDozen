import { MealEventRecipe } from '../db';

interface MealEventResponse {
  id: string,
  Date: Date,
  MealTime: 'Breakfast' | 'Lunch' | 'Dinner',
  Recipe: MealEventRecipe,
  Servings: number,
}

export default MealEventResponse;
