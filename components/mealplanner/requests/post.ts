import axios from 'axios';
import { MealEvent } from '../../../utils/propTypes';

export const postMealEvent = (obj: MealEvent) => axios.post('/api/routes/mealPlanner/', obj)
  .then((res) => res.data);

export const putMealEvent = (obj: MealEvent) => axios.post(`/api/routes/mealPlanner/${obj.id}`, obj)
  .then((res) => res.data);
