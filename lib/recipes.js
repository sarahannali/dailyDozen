import db from "../firebase/clientApp";
import { collection, documentId, getDocs, query, where } from 'firebase/firestore/lite';

export const getAllRecipeData = async () => {
  //TODO: Paginate this
  const recipesCollection = collection(db, 'recipes');
  const recipesSnapshot = await getDocs(recipesCollection);
  const recipesList = recipesSnapshot.docs.map(doc => {
    return {id: doc.id, ...doc.data()}
  });
  return recipesList;
}

export const getRecipeData = async (id) => {
  // update to single query??
  const q = query(collection(db, "recipes"), where(documentId(), "==", id));

  const querySnapshot = await getDocs(q);
  const recipe = querySnapshot.docs.map(doc => {
    return {id: doc.id, ...doc.data()}
  });

  return recipe[0];
}

export const getRecipeSearch = async (queryText) => {
  const recipeQuery = query(collection(db, 'recipes'), where('name', '>=', queryText), where('name', '<=', queryText+ '\uf8ff'));
  const recipeSnapshot = await getDocs(recipeQuery);
  const recipeList = recipeSnapshot.docs.map(doc => doc.data());

  return recipeList;
}