import db from "../firebase/clientApp";
import { doc, getDoc, updateDoc } from 'firebase/firestore/lite';

const userID = "NqDiT6W2QieatjDUbbUO"

export const getNutritionGoalInfo = async () => {
  const userDoc = doc(db, `users/${userID}`);
  const snapshot = await getDoc(userDoc);

  if (snapshot.exists()) {
    const data = snapshot.data();
    return data["nutritionGoals"];
  }
}

export const postNutritionGoalData = async (allNutritionData) => {
  const userDoc = doc(db, `users/${userID}`);
  const result = await updateDoc(userDoc, {nutritionGoals: {...allNutritionData}});

  return result;
}