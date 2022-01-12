import axios from 'axios';

const getRecipes = () => axios.get('/api/routes/recipes')
  .then((res) => res.data);

export default getRecipes;
