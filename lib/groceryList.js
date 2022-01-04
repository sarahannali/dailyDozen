import db from "../firebase/clientApp";
import { collection, getDoc, query, where, doc, updateDoc, addDoc, deleteDoc } from 'firebase/firestore/lite';

const userID = "NqDiT6W2QieatjDUbbUO"

export const getGroceryList = async () => {
  const userDoc = doc(db, `users/${userID}`);
  const snapshot = await getDoc(userDoc);

  if (snapshot.exists()) {
    const data = snapshot.data();
    return data["groceryList"];
  }
}

export const updateGroceryList = async (newGroceryList) => {
  const userDoc = doc(db, `users/${userID}`);
  const result = await updateDoc(userDoc, {groceryList: [...newGroceryList]});
  
  return result;
}
