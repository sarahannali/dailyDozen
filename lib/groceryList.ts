import { getDoc, doc, updateDoc } from 'firebase/firestore/lite';
import db from '../firebase/clientApp';
import { RecipeIngredient } from '../utils/propTypes';

const userID = 'NqDiT6W2QieatjDUbbUO';

export const getGroceryList = async () => {
  const userDoc = doc(db, `users/${userID}`);
  const snapshot = await getDoc(userDoc);

  if (snapshot.exists()) {
    const data = snapshot.data();
    return data.groceryList;
  }

  return {};
};

export const updateGroceryList = async (newGroceryList: RecipeIngredient[]) => {
  const userDoc = doc(db, `users/${userID}`);
  await updateDoc(userDoc, { groceryList: [...newGroceryList] });
};
