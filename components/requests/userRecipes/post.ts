import {
  collection, doc, addDoc,
} from 'firebase/firestore/lite';
import type { UserRecipe } from 'utils/propTypes/db';
import db, { auth } from 'firebase/clientApp';

const postUserRecipe = async (userRecipe: UserRecipe) => {
  const { Favorite, Rating } = userRecipe;
  const userRecipesCollection = collection(db, `users/${auth.currentUser?.uid}/userRecipes`);
  const recipeDoc = doc(db, `recipes/${userRecipe.RecipeID}`);

  const result = await addDoc(userRecipesCollection, {
    Recipe: recipeDoc,
    Favorite,
    Rating,
  });

  return result.id;
};

export default postUserRecipe;
