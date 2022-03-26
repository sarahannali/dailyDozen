import { doc, updateDoc } from 'firebase/firestore/lite';
import { NutritionGoals } from 'utils/propTypes/db';
import db, { auth } from '../../../firebase/clientApp';

// eslint-disable-next-line import/prefer-default-export
export const postNutritionGoalData = async (allNutritionData: NutritionGoals) => {
  const userDoc = doc(db, `users/${auth.currentUser?.uid}`);
  await updateDoc(userDoc, { nutritionGoals: { ...allNutritionData } });
};
