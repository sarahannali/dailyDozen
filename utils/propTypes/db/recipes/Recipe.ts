import { Type } from '../ingredients/Ingredient';

export type RecipeIngredient = {
  amount: number,
  grams: number,
  name: string,
  ratio: number,
  types: Type[]
}

export type Macros = {
  calories: number,
  carbs: number,
  fat: number,
  protein: number
}

type Recipe = {
  id: string,
  name: string,
  imageURL: string,
  source: string,
  ingredients: RecipeIngredient[],
  macros: Macros,
  servings: number,
  Rating: number,
  Favorite: boolean,
  userRecipeID?: string,
  steps: string[]
}

export default Recipe;
