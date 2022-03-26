import {
  collection, doc, addDoc,
} from 'firebase/firestore/lite';
import { MealEvent } from 'utils/propTypes/db';
import db, { auth } from '../../../firebase/clientApp';
import zeroedDate from './util/zeroedDate';

// eslint-disable-next-line import/prefer-default-export
export const postMealEvent = async (mealEvent: MealEvent) => {
  const mealEventsCollection = collection(db, `users/${auth.currentUser?.uid}/mealEvents/`);

  const result = await addDoc(mealEventsCollection, {
    Date: zeroedDate(mealEvent.Date.toString()),
    MealTime: mealEvent.MealTime,
    Recipe: doc(db, `recipes/${mealEvent.RecipeInfo.recipeID}`),
    RecipeInfo: mealEvent.RecipeInfo,
    Servings: 1,
  });

  return result.id;
};
