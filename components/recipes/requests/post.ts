import axios from 'axios';
import { RecipeRequest, UserRecipe } from '../../../utils/propTypes';

export const putUserRecipe = (obj: UserRecipe) => axios.post(`/api/routes/userRecipes/${obj.id}`, obj)
  .then((res) => res.data);

export const postRecipe = (obj: RecipeRequest) => axios.post('/api/routes/recipes', obj)
  .then((res) => ({ err: false, data: res.data }))
  .catch((err) => ({ err: true, data: err.response.data }));
