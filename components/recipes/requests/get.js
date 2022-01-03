import axios from 'axios';

export const getRecipes = () => axios.get(`/api/recipes`)
  .then(function (res) {
    return res.data;
  });