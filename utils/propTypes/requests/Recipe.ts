import { AmountType } from '../db/ingredients/Ingredient';

export interface IngredientRequest {
  amount: number,
  amountType: AmountType,
  name: string,
  types?: string[]
}

interface RecipeRequest {
  name: string,
  source: string,
  imageURL: string,
  calories: number,
  carbs: number,
  fat: number,
  protein: number,
  servings: number,
  ingredients: IngredientRequest[],
  steps: string[]
}

export default RecipeRequest;
