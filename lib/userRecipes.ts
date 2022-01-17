import {
  collection, getDocs, doc, updateDoc, addDoc,
} from 'firebase/firestore/lite';
import db from '../firebase/clientApp';
import { UserRecipe } from '../utils/propTypes';

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

export const updateUserRecipe = async (userRecipeID: string, userRecipe: UserRecipe) => {
  const userRecipeDoc = doc(db, `users/${userID}/userRecipes/${userRecipeID}`);

  await updateDoc(userRecipeDoc, {
    Rating: userRecipe.Rating,
    Favorite: userRecipe.Favorite,
  });

  return userRecipeID;
};

export const createUserRecipe = async (userRecipe: UserRecipe) => {
  const userRecipesCollection = collection(db, `users/${userID}/userRecipes`);
  const recipeDoc = doc(db, `recipes/${userRecipe.RecipeID}`);

  const result = await addDoc(userRecipesCollection, {
    Recipe: recipeDoc,
    Favorite: userRecipe.Favorite,
    Rating: userRecipe.Rating,
  });

  return result.id;
};
