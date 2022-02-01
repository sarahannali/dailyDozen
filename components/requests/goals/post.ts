import { doc, updateDoc } from 'firebase/firestore/lite';
import db, { auth } from '../../../firebase/clientApp';
import { NutritionGoals } from '../../../utils/propTypes';

// eslint-disable-next-line import/prefer-default-export
export const postNutritionGoalData = async (allNutritionData: NutritionGoals) => {
  const userDoc = doc(db, `users/${auth.currentUser?.uid}`);
  await updateDoc(userDoc, { nutritionGoals: { ...allNutritionData } });
};
