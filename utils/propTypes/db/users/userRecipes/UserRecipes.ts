import { DocumentReference } from 'firebase/firestore/lite';

interface UserRecipe {
  id?: string,
  RecipeID?: string,
  Recipe?: DocumentReference,
  Rating: number,
  Favorite: boolean
}

export default UserRecipe;
