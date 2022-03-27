import { DocumentReference } from 'firebase/firestore/lite';

type UserRecipe = {
  id?: string,
  RecipeID?: string,
  Recipe?: DocumentReference,
  Rating: number,
  Favorite: boolean
}

export default UserRecipe;
