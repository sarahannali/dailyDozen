import {
  collection, getDocs,
} from 'firebase/firestore/lite';
import db, { auth } from '../../../firebase/clientApp';

// eslint-disable-next-line import/prefer-default-export
export const getAllUserRecipeData = async () => {
  const userRecipesCollection = collection(db, `users/${auth.currentUser?.uid}/userRecipes`);
  const userRecipesSnapshot = await getDocs(userRecipesCollection);
  const userRecipesList = userRecipesSnapshot.docs.map((userRecipeDoc) => {
    const data = userRecipeDoc.data();

    return {
      id: userRecipeDoc.id,
      RecipeID: data.Recipe.id,
      Rating: data.Rating,
      Favorite: data.Favorite,
    };
  });

  return userRecipesList;
};
