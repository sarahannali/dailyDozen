import { collection, getDocs } from 'firebase/firestore/lite';
import db from '../firebase/clientApp';
import { Ingredient } from '../utils/propTypes';

const getAllIngredientData = async () => {
  const ingredientSnapshot = await getDocs(collection(db, 'ingredients'));

  const ingredientsList = ingredientSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Ingredient[];

  return ingredientsList;
};

export default getAllIngredientData;
