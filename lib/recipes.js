import db from "../firebase/clientApp";
import { collection, getDocs } from 'firebase/firestore/lite';
import { getAllUserRecipeData } from "./userRecipes";

const userID = "NqDiT6W2QieatjDUbbUO"

export const getAllRecipeData = async () => {
  const userRecipes = await getAllUserRecipeData();

  const recipesCollection = collection(db, 'recipes');
  const recipesSnapshot = await getDocs(recipesCollection);
  const recipesList = recipesSnapshot.docs.map(doc => {
    const userRecipe = userRecipes.filter(u => u.RecipeID === doc.id)[0];
    if (userRecipe) {
      return {
        ...doc.data(), ...userRecipe,  id: doc.id, userRecipeID: userRecipe.id
      };
    }
    return {id: doc.id, ...doc.data(), Rating: 0, Favorite: false}
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

export const postRecipe = async (recipe) => {
  console.log(recipe);
  return true;
}
