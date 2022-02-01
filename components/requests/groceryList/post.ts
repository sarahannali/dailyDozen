import { doc, updateDoc } from 'firebase/firestore/lite';
import db, { auth } from '../../../firebase/clientApp';
import { GroceryItem } from '../../../utils/propTypes';

// eslint-disable-next-line import/prefer-default-export
export const postGroceryList = async (newGroceryList: GroceryItem[]) => {
  const userDoc = doc(db, `users/${auth.currentUser?.uid}`);
  await updateDoc(userDoc, { groceryList: [...newGroceryList] });
};
