import {
  collection, getDocs, addDoc, query, where,
} from 'firebase/firestore/lite';
import { StatusCodes } from 'http-status-codes';
import db from '../firebase/clientApp';
import { getAllUserRecipeData } from './userRecipes';
import { ErrorWithStatus, IngredientRequest, RecipeRequest } from '../utils/propTypes';

export const getAllRecipeData = async () => {
  const userRecipes = await getAllUserRecipeData();

  const recipesCollection = collection(db, 'recipes');
  const recipesSnapshot = await getDocs(recipesCollection);
  const recipesList = recipesSnapshot.docs.map((doc) => {
    const userRecipe = userRecipes.filter((u) => u.RecipeID === doc.id)[0];
    if (userRecipe) {
      return {
        ...doc.data(), ...userRecipe, id: doc.id, userRecipeID: userRecipe.id,
      };
    }
    return {
      id: doc.id, ...doc.data(), Rating: 0, Favorite: false,
    };
  });

  return recipesList;
};

const AmountTypeMultipliers = {
  cup: 1,
  tbs: 16,
  tsp: 48,
  gal: 0.0625,
};

const PopulateIngredients = async (ingredients: IngredientRequest[]) => { // todo: fix type
  const ingredientCollection = collection(db, 'ingredients');

  const populatedIngredients = await Promise.all(ingredients.map(async (ingredient) => {
    const { amount, amountType, name } = ingredient;

    const ingredientSnapshot = await getDocs(query(
      ingredientCollection,
      where('name', '==', name),
    ));

    if (ingredientSnapshot.docs.length === 0) {
      const err = new Error(`Ingredient doesn't exist: ${name}`) as ErrorWithStatus;
      err.status = StatusCodes.BAD_REQUEST;

      throw err;
    }

    const ingrData = ingredientSnapshot.docs[0].data();

    const grams = amountType === 'g'
      ? amount
      : (amount * AmountTypeMultipliers[amountType]) * ingrData.ratio;

    const ingredientObj = {
      amount: `${amount} ${amountType}`,
      grams,
      name,
      ratio: ingrData.ratio,
      types: ingrData.types,
    };

    if (ingrData.types) ingredientObj.types = ingrData.types;

    return ingredientObj;
  }));

  return populatedIngredients;
};

export const postRecipe = async (recipe: RecipeRequest) => {
  const recipesCollection = collection(db, 'recipes');

  const ingredients = await PopulateIngredients(recipe.ingredients);

  const result = await addDoc(recipesCollection, {
    name: recipe.name,
    source: recipe.source,
    imageURL: recipe.imageURL,
    macros: {
      calories: recipe.calories,
      carbs: recipe.carbs,
      fat: recipe.fat,
      protein: recipe.protein,
    },
    servings: recipe.servings,
    ingredients,
    steps: recipe.steps,
  });

  return result.id;
};
