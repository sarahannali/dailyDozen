import db from "../firebase/clientApp";
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore/lite';

const userID = "NqDiT6W2QieatjDUbbUO"

export const getAllUserRecipeData = async () => {
  const userRecipesCollection = collection(db, `users/${userID}/userRecipes`);
  const userRecipesSnapshot = await getDocs(userRecipesCollection);
  const userRecipesList = userRecipesSnapshot.docs.map(doc => {
    var data = doc.data();

    return {
      id: doc.id,
      RecipeID: data.Recipe.id,
      Rating: data.Rating,
      Favorite: data.Favorite
    };
  });

  return userRecipesList;
}

export const updateUserRecipe = async (userRecipeID, userRecipe) => {
  const userRecipeDoc = doc(db, `users/${userID}/userRecipes/${userRecipeID}`);

  await updateDoc(userRecipeDoc, {
    Rating: userRecipe.Rating, 
    Favorite: userRecipe.Favorite
  });

  return userRecipeID;
}