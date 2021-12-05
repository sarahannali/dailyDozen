import db from "../firebase/clientApp";
import { collection, getDocs, query, where, doc, updateDoc, addDoc, deleteDoc } from 'firebase/firestore/lite';

const userID = "NqDiT6W2QieatjDUbbUO"

export const getMealEvents = async (dateStr) => {
  const startDate = new Date(dateStr);
  const endDate = new Date(new Date(dateStr).setDate(startDate.getDate() + 6));

  const mealEventsQuery = query(
    collection(db, `users/${userID}/mealEvents`),
    where("Date", ">=", startDate),
    where("Date", "<=", endDate)
  );

  const querySnapshot = await getDocs(mealEventsQuery);
  const mealEventsList = querySnapshot.docs.map(doc => {
    var data = doc.data();
    
    return {
      id: doc.id, 
      Date: data["Date"].toDate().toDateString(), 
      MealTime: data.MealTime, 
      Recipe: {
        recipeID: data.Recipe.id,
        imageURL: data.RecipeInfo.imageURL, 
        name: data.RecipeInfo.name,
        nutritionValues: data.RecipeInfo.nutritionValues,
        ingredients: data.RecipeInfo.ingredients
      },
      Servings: data.Servings
    }
  });

  return mealEventsList;
}

export const updateMealEvent = async (mealEventID, mealEvent) => {
  const mealDoc = doc(db, `users/${userID}/mealEvents/${mealEventID}`);

  if (mealEvent.Date != null) {
    const date = new Date(mealEvent.Date);
    date.setHours(0, 0, 0, 0);

    await updateDoc(mealDoc, {Date: date, MealTime: mealEvent.MealTime});
  } else {
    await updateDoc(mealDoc, {Servings: mealEvent.Servings}); //TODO: cleanup
  }

  return mealEventID;
}

export const createMealEvent = async (mealEvent) => {
  const mealEventsCollection = collection(db, `users/${userID}/mealEvents/`);
  
  const date = new Date(mealEvent.Date);
  date.setHours(0, 0, 0, 0);

  const result = await addDoc(mealEventsCollection, {
    Date: date,
    MealTime: mealEvent.MealTime,
    Recipe: doc(db, `recipes/${mealEvent.RecipeInfo.recipeID}`),
    RecipeInfo: mealEvent.RecipeInfo,
    Servings: 1
  });

  return result.id;
}

export const deleteMealEvent = async (mealEventID) => {
  const mealDoc = doc(db, `users/${userID}/mealEvents/${mealEventID}`);
  await deleteDoc(mealDoc);

  return;
}