import axios from 'axios';

export const deleteMealEvent = (mealEventID) => axios.delete(`/api/routes/mealPlanner/${mealEventID}`)
  .then(function (res) {
    return res.data;
  });