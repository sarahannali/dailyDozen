import {
  doc, updateDoc,
} from 'firebase/firestore/lite';
import { MealEvent } from 'utils/propTypes/db';
import db, { auth } from '../../../firebase/clientApp';
import zeroedDate from './util/zeroedDate';

const putMealEvent = async (mealEvent: MealEvent) => {
  const { Date, MealTime, Servings } = mealEvent;
  const mealDoc = doc(db, `users/${auth.currentUser?.uid}/mealEvents/${mealEvent.id}`);

  await updateDoc(mealDoc, {
    Date: zeroedDate(Date.toString()),
    MealTime,
    Servings,
  });

  return mealEvent.id;
};

export default putMealEvent;
