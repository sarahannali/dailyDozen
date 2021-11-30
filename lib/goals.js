import db from "../firebase/clientApp";
import { doc, collection, getDocs, setDoc, documentId, query, where } from 'firebase/firestore/lite';

const userID = "NqDiT6W2QieatjDUbbUO"

export const getAllNutritionGoalInfo = async () => {
  const goalQuery = query(collection(db, 'nutritionGoals'), where(documentId(), "==", userID));
  const goalSnapshot = await getDocs(goalQuery);
  const goalList = goalSnapshot.docs.map(doc => doc.data());
  return goalList[0];
}

export const postNutritionGoalData = async (allNutritionData) => {
  const goal = doc(db, "nutritionGoals", userID);
  const result = await setDoc(goal, {...allNutritionData});

  return result;
}