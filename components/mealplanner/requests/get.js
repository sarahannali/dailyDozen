import axios from 'axios';

export const getMealEvents = (dateStr) => axios.get('/api/routes/mealPlanner', { params: { date: dateStr } })
  .then(function (res) {
    return res.data;
  });