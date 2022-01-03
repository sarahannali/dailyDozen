import db from "../firebase/clientApp";
import { collection, getDocs, query, where, doc, updateDoc, addDoc, deleteDoc } from 'firebase/firestore/lite';

const userID = "NqDiT6W2QieatjDUbbUO"

export const getMealEvents = async (dateStr) => {
  const startDate = new Date(dateStr);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(dateStr);
  endDate.setDate(endDate.getDate() + 6)

  const mealEventsSnapshot = await getDocs(query(
    collection(db, `users/${userID}/mealEvents`),
    where("Date", ">=", startDate),
    where("Date", "<=", endDate)
  ));

  const mealEventsList = mealEventsSnapshot.docs.map(doc => {
    var data = doc.data();
    
    return {
      id: doc.id, 
      Date: data["Date"].toDate().toDateString(), 
      MealTime: data.MealTime, 
      Recipe: {
        recipeID: data.Recipe.id,
        imageURL: data.RecipeInfo.imageURL, 
        name: data.RecipeInfo.name,
        macros: data.RecipeInfo.macros,
        ingredients: data.RecipeInfo.ingredients,
        servings: data.RecipeInfo.servings
      },
      Servings: data.Servings
    }
  });

  return mealEventsList;
}

const zeroedDate = (dateStr) => {
  const date = new Date(dateStr);
  date.setHours(0, 0, 0, 0);

  return date;
}

export const updateMealEvent = async (mealEventID, mealEvent) => {
  const mealDoc = doc(db, `users/${userID}/mealEvents/${mealEventID}`);

  await updateDoc(mealDoc, {
    Date: zeroedDate(mealEvent.Date), 
    MealTime: mealEvent.MealTime, 
    Servings: mealEvent.Servings
  });

  return mealEventID;
}

export const createMealEvent = async (mealEvent) => {
  const mealEventsCollection = collection(db, `users/${userID}/mealEvents/`);

  const result = await addDoc(mealEventsCollection, {
    Date: zeroedDate(mealEvent.Date),
    MealTime: mealEvent.MealTime,
    Recipe: doc(db, `recipes/${mealEvent.RecipeInfo.recipeID}`),
    RecipeInfo: mealEvent.RecipeInfo,
    Servings: 1
  });

  return result.id;
}

export const deleteMealEvent = async (mealEventID) => {
  const mealDoc = doc(db, `users/${userID}/mealEvents/${mealEventID}`);
  const result = await deleteDoc(mealDoc);

  return result;
}