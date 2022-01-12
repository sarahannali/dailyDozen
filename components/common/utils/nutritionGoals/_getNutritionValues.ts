import { NutritionGoals, NutritionGoalsWithMacros, RecipeIngredient } from '../../../../utils/propTypes';

const GetNutritionValues = (
  ingredients: Array<RecipeIngredient>,
  nutritionGoalData: NutritionGoalsWithMacros,
  servings: number,
  servingsRatio: number,
): NutritionGoals => {
  const nutritionMap: NutritionGoals = {
    beans: 0,
    berries: 0,
    calories: 0,
    carbs: 0,
    cruciferous: 0,
    fat: 0,
    flaxseed: 0,
    fruit: 0,
    grains: 0,
    greens: 0,
    nuts: 0,
    protein: 0,
    vegetables: 0,
  };

  ingredients.forEach((ingr) => {
    const { types } = ingr;

    if (types) {
      types.forEach((type) => {
        const servingsMultiplier = servings / servingsRatio;
        let goal = nutritionGoalData[type];

        if (goal < 1) {
          goal *= nutritionGoalData.calories;
        }

        const amountInIngr = servingsMultiplier * ingr.grams;
        const amountOfGoal = amountInIngr / goal;

        nutritionMap[type] += amountOfGoal;
      });
    }
  });

  return nutritionMap;
};

export default GetNutritionValues;
