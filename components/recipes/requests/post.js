import axios from 'axios';

export const putUserRecipe = (obj) => axios.post(`/api/routes/userRecipes/${obj.id}`, obj)
  .then(function (res) {
    return res.data;
  });
  
export const postRecipe = (obj) => axios.post(`/api/routes/recipes`, obj)
  .then((res) => {
    return {err: false, data: res.data};
  })
  .catch((err) => {
    return {err: true, data: err.response.data};
  });
