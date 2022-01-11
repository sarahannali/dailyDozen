import {
  collection, getDocs, doc, updateDoc,
} from 'firebase/firestore/lite';
import db from '../firebase/clientApp';

const userID = 'NqDiT6W2QieatjDUbbUO';

export const getAllUserRecipeData = async () => {
  const userRecipesCollection = collection(db, `users/${userID}/userRecipes`);
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

type UserRecipeRequest = {
  Rating: number,
  Favorite: boolean
}

export const updateUserRecipe = async (userRecipeID: string, userRecipe: UserRecipeRequest) => {
  const userRecipeDoc = doc(db, `users/${userID}/userRecipes/${userRecipeID}`);

  await updateDoc(userRecipeDoc, {
    Rating: userRecipe.Rating,
    Favorite: userRecipe.Favorite,
  });

  return userRecipeID;
};
