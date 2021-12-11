import axios from 'axios';

export const searchRecipes = (searchStr) => axios.get('/api/recipes/search', {'searchValue': searchStr})
  .then(function (res) {
    return res.data;
  });