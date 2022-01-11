export interface Ingredient {
  amount: string,
  grams: number,
  name: string,
  ratio: number,
  types: Array<string>
}

export interface Macros {
  calories: number,
  carbs: number,
  fat: number,
  protein: number
}

interface Recipe {
  id: string,
  name: string,
  imageURL: string,
  source: string,
  ingredients: Array<Ingredient>,
  steps: Array<string>, // todo: remove
  macros: Macros,
  servings: number,
  Rating: number,
  Favorite: boolean,
  userRecipeID?: string
}

export default Recipe;
