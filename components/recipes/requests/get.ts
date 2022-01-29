import axios from 'axios';

export const getRecipes = () => axios.get('/api/routes/recipes')
  .then((res) => res.data);

export const getNutritionGoals = () => axios.get('/api/routes/goals')
  .then((res) => res.data);
