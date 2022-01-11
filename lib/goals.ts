import { doc, getDoc, updateDoc } from 'firebase/firestore/lite';
import db from '../firebase/clientApp';
import { NutritionGoals } from '../utils/propTypes';

const userID = 'NqDiT6W2QieatjDUbbUO';

export const getNutritionGoalData = async () => {
  const userDoc = doc(db, `users/${userID}`);
  const snapshot = await getDoc(userDoc);

  if (snapshot.exists()) {
    const data = snapshot.data();
    return data.nutritionGoals;
  }

  return {};
};

export const postNutritionGoalData = async (allNutritionData: NutritionGoals) => {
  const userDoc = doc(db, `users/${userID}`);
  await updateDoc(userDoc, { nutritionGoals: { ...allNutritionData } });
};
