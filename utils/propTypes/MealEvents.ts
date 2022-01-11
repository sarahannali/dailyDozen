import { DocumentReference } from 'firebase/firestore/lite';
import { Ingredient, Macros } from './Recipe';

interface MealEvent {
  Date: Date,
  MealTime: string,
  Recipe: DocumentReference,
  RecipeInfo: {
    imageURL: string,
    ingredients: Array<Ingredient>,
    macros: Macros,
    name: string,
    recipeID: string,
    servings: number
  },
  Servings: number
}

export default MealEvent;
