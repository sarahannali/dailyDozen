import { doc, getDoc } from 'firebase/firestore/lite';
import db, { auth } from '../../../firebase/clientApp';

// eslint-disable-next-line import/prefer-default-export
export const getNutritionGoalData = async () => {
  const userDoc = doc(db, `users/${auth.currentUser?.uid}`);
  const snapshot = await getDoc(userDoc);

  if (snapshot.exists()) {
    const data = snapshot.data();
    return data.nutritionGoals;
  }

  return {};
};
