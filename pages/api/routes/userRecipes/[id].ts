import type { NextApiRequest, NextApiResponse } from 'next';
import { updateUserRecipe } from '../../../../lib/userRecipes';
import apiHandler from '../../middleware/apiHandler';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  let result: string;

  if (req.method === 'POST') result = await updateUserRecipe(req.query.id, req.body);

  res.status(200).json(result);
}

export default apiHandler(handler);
