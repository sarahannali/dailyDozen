import { MealEvent } from '../../../../../utils/propTypes';
import { Meal } from '../../../utils/_populateCalendar';

const getRequestObj = (movedObj: Meal, strCodes: string): MealEvent => {
  const codes = strCodes.split(':');

  return {
    id: movedObj.id,
    Date: new Date(codes[0]),
    MealTime: codes[1],
    RecipeInfo: movedObj.RecipeInfo,
    Servings: movedObj.Servings,
  };
};

export default getRequestObj;
