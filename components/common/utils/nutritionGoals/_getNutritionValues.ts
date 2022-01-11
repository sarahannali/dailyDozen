import { NutritionGoalsWithMacros, Ingredient } from '../../../../utils/propTypes';

const GetNutritionValues = (
  ingredients: Array<Ingredient>,
  nutritionGoalData: NutritionGoalsWithMacros,
  servings: number,
  servingsRatio: number,
) => {
  const nutritionMap = Object.keys(nutritionGoalData)
    .reduce((prevObj, key) => ({ ...prevObj, [key]: 0 }), {});

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
