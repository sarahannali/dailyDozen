import axios from 'axios';

export const getRecipes = () => axios.get('/api/routes/recipes')
  .then((res) => res.data);
