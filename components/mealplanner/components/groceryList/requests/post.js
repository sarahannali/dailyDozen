import axios from 'axios';

export const postGroceryList = (obj) => axios.post(`/api/routes/groceryList/`, obj)
  .then(function (res) {
    return res.data;
  });
