import {
  collection, doc, addDoc,
} from 'firebase/firestore/lite';
import { MealEvent } from 'utils/propTypes/db';
import db, { auth } from 'firebase/clientApp';
import zeroedDate from './util/zeroedDate';

const postMealEvent = async (mealEvent: MealEvent) => {
  const { Date, MealTime, RecipeInfo } = mealEvent;
  const mealEventsCollection = collection(db, `users/${auth.currentUser?.uid}/mealEvents/`);

  const result = await addDoc(mealEventsCollection, {
    Date: zeroedDate(Date.toString()),
    MealTime,
    Recipe: doc(db, `recipes/${RecipeInfo.recipeID}`),
    RecipeInfo,
    Servings: 1,
  });

  return result.id;
};

export default postMealEvent;
