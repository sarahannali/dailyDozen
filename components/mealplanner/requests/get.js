import axios from 'axios';

export const getMealEvents = (dateStr) => axios.get('/api/mealPlanner', { params: { date: dateStr } })
  .then(function (res) {
    return res.data;
  });