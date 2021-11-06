import db from "../firebase/clientApp";
import { collection, getDocs, query } from 'firebase/firestore/lite';

export const getAllIngredientData = async () => {
  const q = query(collection(db, "ingredients"));

  const ingredientSnapshot = await getDocs(q);
  const ingredientsList = ingredientSnapshot.docs.map(doc => {
    return {id: doc.id, ...doc.data()}
  });
  return ingredientsList;
}