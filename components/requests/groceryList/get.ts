import { getDoc, doc } from 'firebase/firestore/lite';
import type { GroceryItem } from 'utils/propTypes/db';
import db, { auth } from 'firebaseUtils/clientApp';

const getGroceryList = async (): Promise<GroceryItem[] | null> => {
  const userDoc = doc(db, `users/${auth.currentUser?.uid}`);
  const snapshot = await getDoc(userDoc);

  if (snapshot.exists()) {
    const data = snapshot.data();
    return data.groceryList;
  }

  return null;
};

export default getGroceryList;
