import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllRecipeData, postRecipe } from '../../../../lib/recipes';
import apiHandler from '../../middleware/apiHandler';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  let result: string;

  if (req.method === 'GET') result = (await getAllRecipeData()).toString();
  else if (req.method === 'POST') result = await postRecipe(req.body);

  return res.status(200).json(result);
}

export default apiHandler(handler);
