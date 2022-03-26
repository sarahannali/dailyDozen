import {
  doc, updateDoc,
} from 'firebase/firestore/lite';
import { UserRecipe } from 'utils/propTypes/db';
import db, { auth } from '../../../firebase/clientApp';

// eslint-disable-next-line import/prefer-default-export
export const putUserRecipe = async (userRecipeID: string, userRecipe: UserRecipe) => {
  const userRecipeDoc = doc(db, `users/${auth?.currentUser?.uid}/userRecipes/${userRecipeID}`);

  await updateDoc(userRecipeDoc, {
    Rating: userRecipe.Rating,
    Favorite: userRecipe.Favorite,
  });

  return userRecipeID;
};
