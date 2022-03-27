import { doc, updateDoc } from 'firebase/firestore/lite';
import type { GroceryItem } from 'utils/propTypes/db';
import db, { auth } from 'firebaseUtils/clientApp';

const postGroceryList = async (newGroceryList: GroceryItem[]) => {
  const userDoc = doc(db, `users/${auth.currentUser?.uid}`);
  await updateDoc(userDoc, { groceryList: [...newGroceryList] });
};

export default postGroceryList;
