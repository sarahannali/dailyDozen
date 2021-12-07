import axios from 'axios';

export const deleteMealEvent = (mealEventID) => axios.delete(`/api/mealPlanner/${mealEventID}`)
  .then(function (res) {
    return res.data;
  });