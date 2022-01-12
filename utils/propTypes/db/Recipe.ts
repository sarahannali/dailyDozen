import { Type } from './Ingredient';

export interface Ingredient {
  amount: number,
  grams: number,
  name: string,
  ratio: number,
  types: Array<Type>
}

export interface Macros {
  calories: number,
  carbs: number,
  fat: number,
  protein: number
}

export interface UserRecipe {
  id?: string,
  Rating: number,
  Favorite: boolean
}

interface Recipe {
  id: string,
  name: string,
  imageURL: string,
  source: string,
  ingredients: Array<Ingredient>,
  macros: Macros,
  servings: number,
  Rating: number,
  Favorite: boolean,
  userRecipeID?: string
}

export default Recipe;
