import { doc, getDoc } from 'firebase/firestore/lite';
import type { NutritionGoalsWithMacros } from 'utils/propTypes/db';
import db, { auth } from 'firebaseUtils/clientApp';

const getNutritionGoalData = async (): Promise<NutritionGoalsWithMacros | null> => {
  const userDoc = doc(db, `users/${auth.currentUser?.uid}`);
  const snapshot = await getDoc(userDoc);

  if (snapshot.exists()) {
    const data = snapshot.data();
    return data.nutritionGoals as NutritionGoalsWithMacros;
  }

  return null;
};

export default getNutritionGoalData;
