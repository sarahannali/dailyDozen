/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { RecipeIngredient } from '../../../../../utils/propTypes';

export const postGroceryList = (obj: RecipeIngredient[]) => axios.post('/api/routes/groceryList/', obj)
  .then((res) => res.data);
