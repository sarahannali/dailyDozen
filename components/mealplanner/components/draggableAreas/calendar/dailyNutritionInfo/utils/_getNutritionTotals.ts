import { NutritionGoalsWithMacros } from '../../../../../../../utils/propTypes';
import { GetNutritionValues } from '../../../../../../common';
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

// const GetMealTimeNutritionTotals = (
//   mealTimeArr: Meal[],
//   nutritionMap: Record<keyof NutritionGoals, number>,
//   nutritionGoals: NutritionGoalsWithMacros,
// ) => mealTimeArr.reduce(
//   (prevNutritionMap, meal) => {
//     const mealNutritionMap = GetNutritionValues(
//       meal.RecipeInfo.ingredients,
//       nutritionGoals,
//       meal.Servings,
//       meal.RecipeInfo.servings,
//     );

//     return SetMealNutritionTotals(mealNutritionMap, prevNutritionMap);
//   },
//   nutritionMap,
// );

// const GetMacroNutritionTotals = (
//   mealTimeArr: Meal[],
//   nutritionMap: Macros,
// ): Macros => mealTimeArr.reduce(
//   (prevNutritionMap, meal) => {
//     const mealNutritionMap = macros.reduce(
//       (prevMealNutritionMap, macro) => {
//         const amountOfMacroInMeal = (
//           (meal.RecipeInfo.macros[macro] / meal.RecipeInfo.servings) * meal.Servings
//         );

//         return {
//           ...prevMealNutritionMap,
//           [macro]:
//           prevMealNutritionMap[macro]
//             ? prevMealNutritionMap[macro] + amountOfMacroInMeal
//             : amountOfMacroInMeal,
//         };
//       },
//       {},
//     );

//     return SetMealNutritionTotals(mealNutritionMap, prevNutritionMap);
//   },
//   nutritionMap,
// );

// export const GetNutritionTotals = (
//   nutritionGoals: NutritionGoals,
//   meals: Meals,
// ): NutritionGoals => Object.keys(meals).reduce(
//   (prevNutritionMap, mealtimeKey) => {
//     const nutritionGoalsWithoutMacros = Object
//       .keys(nutritionGoals)
//       .filter((goal) => !macros.includes(goal))
//       .reduce((prevObj, key) => ({ ...prevObj, [key]: nutritionGoals[key] }), {});

//     return GetMealTimeNutritionTotals(
//       meals[mealtimeKey],
//       prevNutritionMap,
//       nutritionGoalsWithoutMacros,
//     );
//   },
//   {},
// );

// export const GetMacroTotals = (meals: Meals): Macros =>
// (Object.keys(meals) as Array<keyof Meals>)
//   .reduce(
//     (prevNutritionMap, mealtimeKey) => GetMacroNutritionTotals(
//       meals[mealtimeKey],
//       prevNutritionMap,
//     ),
//     {} as Macros,
//   );

const GetMealTimeTotals = (
  mealTime: Meal[],
  nutritionMap: NutritionGoalsWithMacros,
  nutritionGoalData: NutritionGoalsWithMacros,
): NutritionGoalsWithMacros => mealTime.reduce(
  (prevObj, meal) => {
    const nutritionForMeal = GetNutritionValues(
      meal.RecipeInfo.ingredients,
      nutritionGoalData,
      meal.Servings,
      meal.RecipeInfo.servings,
    );

    return SetMealNutritionTotals(nutritionForMeal, nutritionMap);
  },
  nutritionMap,
);

const GetNutritionTotals = (
  nutritionGoals: NutritionGoalsWithMacros,
  meals: Meals,
): NutritionGoalsWithMacros => (Object.keys(meals) as Array<keyof Meals>)
  .reduce(
    (prevObj, mealKey) => GetMealTimeTotals(meals[mealKey], prevObj, nutritionGoals),
    {} as NutritionGoalsWithMacros,
  );

export default GetNutritionTotals;
