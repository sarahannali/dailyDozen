/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { GroceryItem } from '../../../../../utils/propTypes';

export const postGroceryList = (obj: GroceryItem[]) => axios.post('/api/routes/groceryList/', obj)
  .then((res) => res.data);
