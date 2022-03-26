import {
  collection, getDocs, query, where,
} from 'firebase/firestore/lite';
import { MealEvent } from 'utils/propTypes/db';
import { MealEventResponse } from 'utils/propTypes/requests';
import db, { auth } from 'firebase/clientApp';

const getMealEvents = async (dateStr: string): Promise<MealEventResponse[]> => {
  const startDate = new Date(dateStr);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(dateStr);
  endDate.setDate(endDate.getDate() + 6);

  const mealEventsSnapshot = await getDocs(query(
    collection(db, `users/${auth.currentUser?.uid}/mealEvents`),
    where('Date', '>=', startDate),
    where('Date', '<=', endDate),
  ));

  const mealEventsList = mealEventsSnapshot.docs.map((mealEventDoc) => {
    const data = mealEventDoc.data() as MealEvent;

    const {
      MealTime, Date, Recipe, RecipeInfo, Servings,
    } = data;
    const {
      name, macros, ingredients, servings,
    } = RecipeInfo;

    return {
      id: mealEventDoc.id,
      Date,
      MealTime,
      Recipe: {
        recipeID: Recipe?.id,
        name,
        macros,
        ingredients,
        servings,
      },
      Servings,
    };
  });

  return mealEventsList;
};

export default getMealEvents;
