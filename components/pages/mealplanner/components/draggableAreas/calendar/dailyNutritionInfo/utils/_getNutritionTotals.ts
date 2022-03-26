import { NutritionGoalsWithMacros, Macros } from 'utils/propTypes/db';
import { GetNutritionValues } from '../../../../../../../common';
import { Meals, Meal } from '../../../../../utils/_populateCalendar';

const SetMealNutritionTotals = (
  mealNutritionMap: NutritionGoalsWithMacros,
  nutritionMap: NutritionGoalsWithMacros,
) => (Object.keys(mealNutritionMap) as Array<keyof NutritionGoalsWithMacros>).reduce(
  (prevNutritionMap, nutrValKey) => ({
    ...prevNutritionMap,
    [nutrValKey]:
      prevNutritionMap[nutrValKey]
        ? prevNutritionMap[nutrValKey] + mealNutritionMap[nutrValKey]
        : mealNutritionMap[nutrValKey],
  }),
  nutritionMap,
);

const GetMealTimeTotals = (
  mealTime: Meal[],
  nutritionMap: NutritionGoalsWithMacros,
  nutritionGoalData: NutritionGoalsWithMacros,
): NutritionGoalsWithMacros => mealTime.reduce(
  (prevObj, meal) => {
    const servings = meal.Servings;
    const servingsRatio = meal.RecipeInfo.servings;

    const nutritionForMeal = GetNutritionValues(
      meal.RecipeInfo.ingredients,
      nutritionGoalData,
      servings,
      servingsRatio,
    ) as NutritionGoalsWithMacros;

    (Object.keys(meal.RecipeInfo.macros) as Array<keyof Macros>).forEach((macro) => {
      nutritionForMeal[macro] = meal.RecipeInfo.macros[macro] * (servings / servingsRatio);
    });

    return SetMealNutritionTotals(nutritionForMeal, prevObj);
  },
  nutritionMap,
);

function GetNutritionTotals(
  nutritionGoals: NutritionGoalsWithMacros,
  meals: Meals,
): NutritionGoalsWithMacros | null {
  const nutritionInfo = (Object.keys(meals) as Array<keyof Meals>)
    .reduce(
      // eslint-disable-next-line react/destructuring-assignment
      (prevObj, mealKey) => GetMealTimeTotals(meals[mealKey], prevObj, nutritionGoals),
    {} as NutritionGoalsWithMacros,
    );

  return Object.keys(nutritionInfo).length === 0 ? null : nutritionInfo;
}

export default GetNutritionTotals;
