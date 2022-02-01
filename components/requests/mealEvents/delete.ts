import {
  doc, deleteDoc,
} from 'firebase/firestore/lite';
import db, { auth } from '../../../firebase/clientApp';

// eslint-disable-next-line import/prefer-default-export
export const deleteMealEvent = async (mealEventID: string) => {
  const mealDoc = doc(db, `users/${auth.currentUser?.uid}/mealEvents/${mealEventID}`);
  await deleteDoc(mealDoc);

  return mealEventID;
};
