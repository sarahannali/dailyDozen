import { doc, updateDoc } from 'firebase/firestore/lite';
import { UserRecipe } from 'utils/propTypes/db';
import db, { auth } from '../../../firebase/clientApp';

const putUserRecipe = async (userRecipeID: string, userRecipe: UserRecipe) => {
  const { Rating, Favorite } = userRecipe;
  const userRecipeDoc = doc(db, `users/${auth?.currentUser?.uid}/userRecipes/${userRecipeID}`);

  await updateDoc(userRecipeDoc, {
    Rating,
    Favorite,
  });

  return userRecipeID;
};

export default putUserRecipe;
