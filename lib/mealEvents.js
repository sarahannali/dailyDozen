import db from "../firebase/clientApp";
import { collection, getDocs, query, where } from 'firebase/firestore/lite';

export const getCurrentWeekMealEvents = async () => {
  let start = new Date('2021-10-10'); // TODO: update to actual logic
  let end = new Date('2021-10-17');

  const q = query(collection(db, "mealEvents"), where("date", ">=", start));

  const querySnapshot = await getDocs(q);
  const mealEventsList = querySnapshot.docs.map(doc => {
    var data = doc.data();
    data["date"] = data["date"].seconds;
    
    return {id: doc.id, ...data}
  });

  return mealEventsList;
}
