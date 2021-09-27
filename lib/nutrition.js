import db from "../firebase/clientApp";
import { collection, getDocs } from 'firebase/firestore/lite';

export const getNutritionInfo = async () => {
  const goalCollection = collection(db, 'nutritionGoals');
  const goalSnapshot = await getDocs(goalCollection);
  const goalList = goalSnapshot.docs.map(doc => doc.data());
  return goalList;
}