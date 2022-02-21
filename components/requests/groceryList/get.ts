import { getDoc, doc } from 'firebase/firestore/lite';
import db, { auth } from '../../../firebase/clientApp';

// eslint-disable-next-line import/prefer-default-export
export const getGroceryList = async () => {
  const userDoc = doc(db, `users/${auth.currentUser?.uid}`);
  const snapshot = await getDoc(userDoc);

  if (snapshot.exists()) {
    const data = snapshot.data();
    if (data.groceryIngredient) return data.groceryList;
  }

  return [];
};
