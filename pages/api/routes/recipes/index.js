import { getAllRecipeData, postRecipe } from '../../../../lib/recipes';
import apiHandler from '../../middleware/apiHandler';

async function handler(req, res) {
  let result;

  if (req.method === 'GET') result = await getAllRecipeData();
  else if (req.method === 'POST') result = await postRecipe(req.body);

  return res.status(200).json(result);
}

export default apiHandler(handler);