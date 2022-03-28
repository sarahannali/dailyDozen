import { collection, getDocs } from 'firebase/firestore/lite';
import type { UserRecipe } from 'utils/propTypes/db';
import db, { auth } from 'firebaseUtils/clientApp';

const getAllUserRecipeData = async (): Promise<UserRecipe[]> => {
  const userRecipesCollection = collection(db, `users/${auth.currentUser?.uid}/userRecipes`);
  const userRecipesSnapshot = await getDocs(userRecipesCollection);
  const userRecipesList = userRecipesSnapshot.docs.map((userRecipeDoc) => {
    const data = userRecipeDoc.data() as UserRecipe;
    const {
      Recipe, Rating, Favorite,
    } = data;

    return {
      id: userRecipeDoc.id,
      RecipeID: Recipe?.id,
      Rating,
      Favorite,
    };
  });

  return userRecipesList;
};

export default getAllUserRecipeData;
