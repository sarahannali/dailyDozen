import { NutritionGoals, NutritionGoalsWithMacros, RecipeIngredient } from '../../../../utils/propTypes';

const GetNutritionValues = (
  ingredients: RecipeIngredient[],
  nutritionGoalData: NutritionGoalsWithMacros,
  servings: number,
  servingsRatio: number,
): NutritionGoals => {
  const nutritionMap: NutritionGoals = {
    beans: 0,
    berries: 0,
    cruciferous: 0,
    flaxseed: 0,
    fruit: 0,
    grains: 0,
    greens: 0,
    nuts: 0,
    vegetables: 0,
  };

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
