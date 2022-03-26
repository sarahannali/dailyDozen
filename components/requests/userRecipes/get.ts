import { collection, getDocs } from 'firebase/firestore/lite';
import { UserRecipe } from 'utils/propTypes/db';
import db, { auth } from '../../../firebase/clientApp';

const getAllUserRecipeData = async (): Promise<UserRecipe[]> => {
  const userRecipesCollection = collection(db, `users/${auth.currentUser?.uid}/userRecipes`);
  const userRecipesSnapshot = await getDocs(userRecipesCollection);
  const userRecipesList = userRecipesSnapshot.docs.map((userRecipeDoc) => {
    const data = userRecipeDoc.data() as UserRecipe;
    const {
      id, Recipe, Rating, Favorite,
    } = data;

    return {
      id,
      RecipeID: Recipe?.id,
      Rating,
      Favorite,
    };
  });

  return userRecipesList;
};

export default getAllUserRecipeData;
