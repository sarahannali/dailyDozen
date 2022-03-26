import { doc, updateDoc } from 'firebase/firestore/lite';
import { NutritionGoals } from 'utils/propTypes/db';
import db, { auth } from '../../../firebase/clientApp';

const postNutritionGoalData = async (allNutritionData: NutritionGoals) => {
  const userDoc = doc(db, `users/${auth.currentUser?.uid}`);
  await updateDoc(userDoc, { nutritionGoals: { ...allNutritionData } });
};

export default postNutritionGoalData;
