import { getAllRecipeData } from '../../../lib/recipes';

export default async function handler(req, res) {
  let result;

  if (req.method === 'GET') {
    result = await getAllRecipeData();
  }

  return res.status(200).json(result);
}