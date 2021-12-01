import db from "../firebase/clientApp";
import { collection, getDocs, query, where, documentId } from 'firebase/firestore/lite';

const userID = "NqDiT6W2QieatjDUbbUO"

export const getCurrentWeekMealEvents = async () => {
  let start = new Date('2021-10-10'); // TODO: update to actual logic
  // let end = new Date('2021-10-17');

  const q = query(collection(db, "mealEvents"), where(documentId(), "==", userID));

  const querySnapshot = await getDocs(q);
  const mealEventsList = querySnapshot.docs.map(doc => {
    console.log("DOC: ", doc.data());
    var data = doc.data();
    console.log("DATE: ", data.Date);
    data["Date"] = data["Date"].seconds;
    
    return {id: doc.id, ...data}
  });

  return mealEventsList;
}

export const postMealEvent = async (mealEvent) => {
  console.log("MEAL EVENT: ", mealEvent);
  return;
}