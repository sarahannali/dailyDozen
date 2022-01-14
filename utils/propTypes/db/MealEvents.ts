import { DocumentReference } from 'firebase/firestore/lite';
import { Ingredient, Macros } from './Recipe';

interface MealEvent {
  id?: string,
  Date: Date,
  MealTime: string,
  Recipe?: DocumentReference,
  RecipeInfo: {
    imageURL: string,
    ingredients: Ingredient[],
    macros: Macros,
    name: string,
    recipeID: string,
    servings: number
  },
  Servings: number
}

export default MealEvent;
