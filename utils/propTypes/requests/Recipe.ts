import { AmountType } from '../db/Ingredient';

export type IngredientRequest = {
  amount: number,
  amountType: AmountType,
  name: string
}

type RecipeRequest = {
  name: string,
  source: string,
  imageURL: string,
  calories: number,
  carbs: number,
  fat: number,
  protein: number,
  servings: number,
  ingredients: Array<IngredientRequest>,
  steps: Array<string>
}

export default RecipeRequest;
