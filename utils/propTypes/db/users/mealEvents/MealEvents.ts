import { DocumentReference } from 'firebase/firestore/lite';
import { RecipeIngredient, Macros } from '../../recipes/Recipe';

interface MealEvent {
  id?: string,
  Date: Date,
  MealTime: string,
  Recipe?: DocumentReference,
  RecipeInfo: {
    imageURL: string,
    ingredients: RecipeIngredient[],
    macros: Macros,
    name: string,
    recipeID: string,
    servings: number
  },
  Servings: number
}

export default MealEvent;
