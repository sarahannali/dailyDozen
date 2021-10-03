import db from "../firebase/clientApp";
import { collection, documentId, getDocs, query, where, DocumentReference } from 'firebase/firestore/lite';

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
  const recipesList = querySnapshot.docs.map(doc => {
    return {id: doc.id, ...doc.data()}
  });

  return recipesList;
}