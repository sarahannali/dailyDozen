import db from "../firebase/clientApp";
import { collection, getDocs } from 'firebase/firestore/lite';

export const getRecipeData = async () => {
  const recipesCollection = collection(db, 'recipes');
  const recipesSnapshot = await getDocs(recipesCollection);
  const recipesList = recipesSnapshot.docs.map(doc => doc.data());
  return recipesList;
}