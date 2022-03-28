import type { Meal } from 'components/pages/mealplanner/types';
import type { MealEvent, MealTime } from 'utils/propTypes/db';

const getRequestObj = (movedObj: Meal, strCodes: string): MealEvent => {
  const { id, RecipeInfo, Servings } = movedObj;
  const codes = strCodes.split(':') as MealTime[];

  return {
    id,
    Date: new Date(codes[0]),
    MealTime: codes[1],
    RecipeInfo,
    Servings,
  };
};

export default getRequestObj;
