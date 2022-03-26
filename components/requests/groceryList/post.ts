import { doc, updateDoc } from 'firebase/firestore/lite';
import { GroceryItem } from 'utils/propTypes/db';
import db, { auth } from '../../../firebase/clientApp';

// eslint-disable-next-line import/prefer-default-export
export const postGroceryList = async (newGroceryList: GroceryItem[]) => {
  const userDoc = doc(db, `users/${auth.currentUser?.uid}`);
  await updateDoc(userDoc, { groceryList: [...newGroceryList] });
};
