import { GetNutritionValues } from "../../../../../../common";

const macros = ['calories', 'carbs', 'fat', 'protein'];

const SetMealNutritionTotals = (mealNutritionMap, nutritionMap) => Object.keys(mealNutritionMap).reduce(
  (prevNutritionMap, nutrValKey) => {
    return {...prevNutritionMap,
      [nutrValKey]:
      prevNutritionMap[nutrValKey] 
        ? prevNutritionMap[nutrValKey] + mealNutritionMap[nutrValKey]
        : mealNutritionMap[nutrValKey]
    }
  }, 
  nutritionMap
);

const GetMealTimeNutritionTotals = (mealTimeArr, nutritionMap, nutritionGoals) => mealTimeArr.reduce(
  (prevNutritionMap, meal) => {
    const mealNutritionMap = GetNutritionValues(
      meal.RecipeInfo.ingredients,
      nutritionGoals,
      meal.Servings,
      meal.RecipeInfo.servings
    );

    return SetMealNutritionTotals(mealNutritionMap, prevNutritionMap);
  },
  nutritionMap
);

const GetMacroNutritionTotals = (mealTimeArr, nutritionMap) => mealTimeArr.reduce(
  (prevNutritionMap, meal) => {
    const mealNutritionMap = macros.reduce(
      (prevMealNutritionMap, macro) => {
        const amountOfMacroInMeal = ((meal.RecipeInfo.macros[macro] / meal.RecipeInfo.servings) * meal.Servings);

        return {...prevMealNutritionMap,
          [macro]:
          prevMealNutritionMap[macro]
            ? prevMealNutritionMap[macro] + amountOfMacroInMeal
            : amountOfMacroInMeal
        }
      },
      {}
    )

    return SetMealNutritionTotals(mealNutritionMap, prevNutritionMap);
  },
  nutritionMap
);

export const GetNutritionTotals = (nutritionGoals, meals) => Object.keys(meals).reduce(
  (prevNutritionMap, mealtimeKey) => {
    const nutritionGoalsWithoutMacros = 
      Object
        .keys(nutritionGoals)
        .filter(goal => !macros.includes(goal))
        .reduce((prevObj, key) => { return {...prevObj, [key]: nutritionGoals[key]} }, {});

    return GetMealTimeNutritionTotals(meals[mealtimeKey], prevNutritionMap, nutritionGoalsWithoutMacros)
  }, 
  {}
);

export const GetMacroTotals = (meals) => Object.keys(meals).reduce(
  (prevNutritionMap, mealtimeKey) => GetMacroNutritionTotals(meals[mealtimeKey], prevNutritionMap),
  {}
);
