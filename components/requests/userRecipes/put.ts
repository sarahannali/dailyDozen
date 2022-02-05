import {
  doc, updateDoc,
} from 'firebase/firestore/lite';
import db, { auth } from '../../../firebase/clientApp';
import { UserRecipe } from '../../../utils/propTypes';

// eslint-disable-next-line import/prefer-default-export
export const putUserRecipe = async (userRecipeID: string, userRecipe: UserRecipe) => {
  const userRecipeDoc = doc(db, `users/${auth?.currentUser?.uid}/userRecipes/${userRecipeID}`);

  await updateDoc(userRecipeDoc, {
    Rating: userRecipe.Rating,
    Favorite: userRecipe.Favorite,
  });

  return userRecipeID;
};
