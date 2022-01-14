/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const getMealEvents = (dateStr: string) => axios.get(
  '/api/routes/mealPlanner',
  { params: { date: dateStr } },
)
  .then((res) => res.data);
