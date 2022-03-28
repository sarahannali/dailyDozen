import type {
  NutritionGoals,
  NutritionGoalsWithMacros,
  RecipeIngredient,
} from 'utils/propTypes/db';
import { EmptyNutritionGoals } from '../../../../utils/constants/goals';

const GetNutritionValues = (
  ingredients: RecipeIngredient[],
  nutritionGoalData: NutritionGoalsWithMacros,
  servings: number,
  servingsRatio: number,
): NutritionGoals => {
  const nutritionMap: NutritionGoals = { ...EmptyNutritionGoals };

  ingredients.forEach((ingr) => {
    const { types } = ingr;

    if (types) {
      types.forEach((type) => {
        const servingsMultiplier = servings / servingsRatio;
        const goal = nutritionGoalData[type];

        if (goal === 0) nutritionMap[type] = 1;
        else {
          const amountInIngr = servingsMultiplier * ingr.grams;
          const amountOfGoal = amountInIngr / goal;

          nutritionMap[type] += amountOfGoal;
        }
      });
    }
  });

  return nutritionMap;
};

export default GetNutritionValues;
