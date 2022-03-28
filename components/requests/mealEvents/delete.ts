import { doc, deleteDoc } from 'firebase/firestore/lite';
import db, { auth } from 'firebaseUtils/clientApp';

const deleteMealEvent = async (mealEventID: string) => {
  const mealDoc = doc(
    db,
    `users/${auth.currentUser?.uid}/mealEvents/${mealEventID}`,
  );

  await deleteDoc(mealDoc);

  return mealEventID;
};

export default deleteMealEvent;
