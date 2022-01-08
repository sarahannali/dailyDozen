import db from "../firebase/clientApp";
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore/lite';
import { getAllUserRecipeData } from "./userRecipes";
import { StatusCodes } from "http-status-codes";

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

const AmountTypeMultipliers = {
  cup: 1,
  tbs: 16,
  tsp: 48,
  gal: .0625
};

const PopulateIngredients = async (ingredients) => {
  const ingredientCollection = collection(db, "ingredients");

  const populatedIngredients = await Promise.all(ingredients.map(async ingredient => {
    const {amount, amountType, name} = ingredient;

    const ingredientSnapshot = await getDocs(query(
      ingredientCollection,
      where("name", "==", name)
    ));

    if (ingredientSnapshot.docs.length == 0) {
      const err = new Error("Ingredient doesn't exist: " + name);
      err.status = StatusCodes.BAD_REQUEST;

      throw err;
    }

    const ingrData = ingredientSnapshot.docs[0].data();

    const ingredientObj = {
      amount: amount + " " + amountType,
      grams: (amount * AmountTypeMultipliers[amountType]) * ingrData.ratio,
      name: name,
      ratio: ingrData.ratio
    }

    if (ingrData.types) ingredientObj.types = ingrData.types;

    return ingredientObj;
  }));

  return populatedIngredients;
}

export const postRecipe = async (recipe) => {
  const recipesCollection = collection(db, 'recipes');

  console.log("BEFORE")
  const ingredients = await PopulateIngredients(recipe.ingredients);
  console.log("INGREDIENTS: ", ingredients);

  const result = await addDoc(recipesCollection, {
    name: recipe.name,
    source: recipe.source,
    imageURL: recipe.imageURL,
    macros: {
      calories: recipe.calories,
      carbs: recipe.carbs,
      fat: recipe.fat,
      protein: recipe.protein
    },
    servings: recipe.servings,
    ingredients: ingredients,
    steps: recipe.steps
  });

  return result.id;
}
