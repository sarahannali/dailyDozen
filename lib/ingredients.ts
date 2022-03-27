import { collection, getDocs } from 'firebase/firestore/lite';
import type { Ingredient } from 'utils/propTypes/db';
import db from '../firebaseUtils/clientApp';

const getAllIngredientData = async () => {
  const ingredientSnapshot = await getDocs(collection(db, 'ingredients'));

  const ingredientsList = ingredientSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Ingredient[];

  return ingredientsList;
};

export default getAllIngredientData;
