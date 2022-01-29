import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const getNutritionGoals = () => axios.get('/api/routes/goals')
  .then((res) => res.data);
