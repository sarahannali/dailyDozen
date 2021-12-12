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

export const getRecipeData = async (recipeID) => {
  const recipeDoc = doc(db, `recipes/${recipeID}`);
  const snapshot = await getDoc(recipeDoc);

  if (snapshot.exists()) {
    const data = snapshot.data();
    return data;
  }
}

// export const getRecipeSearch = async (queryText) => {
//   const recipeQuery = query(collection(db, 'recipes'), where('name', '>=', queryText), where('name', '<=', queryText+ '\uf8ff'));
//   const recipeSnapshot = await getDocs(recipeQuery);
//   const recipeList = recipeSnapshot.docs.map(doc => doc.data());

//   return recipeList;
// }