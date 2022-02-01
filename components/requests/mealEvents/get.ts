import {
  collection, getDocs, query, where,
} from 'firebase/firestore/lite';
import db, { auth } from '../../../firebase/clientApp';

// eslint-disable-next-line import/prefer-default-export
export const getMealEvents = async (dateStr: string) => {
  const startDate = new Date(dateStr);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(dateStr);
  endDate.setDate(endDate.getDate() + 6);

  const mealEventsSnapshot = await getDocs(query(
    collection(db, `users/${auth.currentUser?.uid}/mealEvents`),
    where('Date', '>=', startDate),
    where('Date', '<=', endDate),
  ));

  const mealEventsList = mealEventsSnapshot.docs.map((mealEventDoc) => {
    const data = mealEventDoc.data();

    return {
      id: mealEventDoc.id,
      Date: data.Date.toDate().toDateString(),
      MealTime: data.MealTime,
      Recipe: {
        recipeID: data.Recipe.id,
        imageURL: data.RecipeInfo.imageURL,
        name: data.RecipeInfo.name,
        macros: data.RecipeInfo.macros,
        ingredients: data.RecipeInfo.ingredients,
        servings: data.RecipeInfo.servings,
      },
      Servings: data.Servings,
    };
  });

  return mealEventsList;
};
