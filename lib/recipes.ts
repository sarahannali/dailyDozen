import { collection, getDocs } from 'firebase/firestore/lite';
import db from '../firebase/clientApp';
import { Recipe } from '../utils/propTypes';

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
