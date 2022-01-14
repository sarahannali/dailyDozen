/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const deleteMealEvent = (mealEventID: string) => axios.delete(
  `/api/routes/mealPlanner/${mealEventID}`,
)
  .then((res) => res.data);
