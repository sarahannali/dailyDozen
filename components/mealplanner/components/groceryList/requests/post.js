import axios from 'axios';

export const postGroceryList = (obj) => axios.post(`/api/groceryList/`, obj)
  .then(function (res) {
    return res.data;
  });
