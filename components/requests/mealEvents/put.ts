import {
  doc, updateDoc,
} from 'firebase/firestore/lite';
import db, { auth } from '../../../firebase/clientApp';
import { MealEvent } from '../../../utils/propTypes';
import zeroedDate from './util/zeroedDate';

// eslint-disable-next-line import/prefer-default-export
export const putMealEvent = async (mealEvent: MealEvent) => {
  const mealDoc = doc(db, `users/${auth.currentUser?.uid}/mealEvents/${mealEvent.id}`);

  await updateDoc(mealDoc, {
    Date: zeroedDate(mealEvent.Date.toString()),
    MealTime: mealEvent.MealTime,
    Servings: mealEvent.Servings,
  });

  return mealEvent.id;
};
