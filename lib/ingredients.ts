import { collection, getDocs, query } from 'firebase/firestore/lite';
import db from '../firebase/clientApp';

const getAllIngredientData = async () => {
  const q = query(collection(db, 'ingredients'));

  const ingredientSnapshot = await getDocs(q);
  const ingredientsList = ingredientSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return ingredientsList;
};

export default getAllIngredientData;
