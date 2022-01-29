import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const getGroceryList = () => axios.get('/api/routes/groceryList')
  .then((res) => res.data);
