import type { Meal, Meals } from 'components/pages/mealplanner/types';
import type { NutritionGoalsWithMacros, Macros } from 'utils/propTypes/db';
import { GetNutritionValues } from 'components/common';

const SetMealNutritionTotals = (
  mealNutritionMap: NutritionGoalsWithMacros,
  nutritionMap: NutritionGoalsWithMacros,
) => (Object.keys(mealNutritionMap) as Array<keyof NutritionGoalsWithMacros>)
  .reduce(
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
): NutritionGoalsWithMacros => mealTime
  .reduce(
    (prevObj, meal) => {
      const { ingredients, macros, servings } = meal.RecipeInfo;

      const nutritionForMeal = GetNutritionValues(
        ingredients,
        nutritionGoalData,
        meal.Servings,
        servings,
      ) as NutritionGoalsWithMacros;

      (Object.keys(macros) as Array<keyof Macros>).forEach((macro) => {
        nutritionForMeal[macro] = macros[macro] * (meal.Servings / servings);
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
      (prevObj, mealKey) => {
        const { [mealKey]: mealTime } = meals;
        return GetMealTimeTotals(mealTime, prevObj, nutritionGoals);
      },
    {} as NutritionGoalsWithMacros,
    );

  return Object.keys(nutritionInfo).length === 0 ? null : nutritionInfo;
}

export default GetNutritionTotals;
