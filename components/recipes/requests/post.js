import axios from 'axios';

export const putUserRecipe = (obj) => axios.post(`/api/userRecipes/${obj.id}`, obj)
  .then(function (res) {
    return res.data;
  });
  
export const postRecipe = (obj) => axios.post(`/api/recipes`, obj)
  .then(function (res) {
    return res.data;
  });
