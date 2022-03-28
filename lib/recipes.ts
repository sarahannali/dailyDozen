import { collection, getDocs } from 'firebase/firestore/lite';
import type { Recipe } from 'utils/propTypes/db';
import db from '../firebaseUtils/clientApp';

const getAllRecipeData = async () => {
  const recipesSnapshot = await getDocs(collection(db, 'recipes'));

  const recipesList = recipesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    Rating: 0,
    Favorite: false,
  })) as Recipe[];

  return recipesList;
};

export default getAllRecipeData;
