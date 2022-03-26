import {
  collection, doc, addDoc,
} from 'firebase/firestore/lite';
import { UserRecipe } from 'utils/propTypes/db';
import db, { auth } from '../../../firebase/clientApp';

// eslint-disable-next-line import/prefer-default-export
export const postUserRecipe = async (userRecipe: UserRecipe) => {
  const userRecipesCollection = collection(db, `users/${auth.currentUser?.uid}/userRecipes`);
  const recipeDoc = doc(db, `recipes/${userRecipe.RecipeID}`);

  const result = await addDoc(userRecipesCollection, {
    Recipe: recipeDoc,
    Favorite: userRecipe.Favorite,
    Rating: userRecipe.Rating,
  });

  return result.id;
};
