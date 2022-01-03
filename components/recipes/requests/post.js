import axios from 'axios';

export const putUserRecipe = (obj) => axios.post(`/api/userRecipes/${obj.id}`, obj)
  .then(function (res) {
    return res.data;
  });