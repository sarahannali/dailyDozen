import axios from 'axios';

export const postMealEvent = (obj) => axios.post(`/api/mealPlanner/`, obj)
  .then(function (res) {
    return res.data;
  });

export const putMealEvent = (obj) => axios.post(`/api/mealPlanner/${obj.id}`, obj)
  .then(function (res) {
    return res.data;
  });