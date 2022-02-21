import type { NextApiRequest } from 'next';
import { getAllRecipeData, postRecipe } from '../../lib/recipes';

function handler(req: NextApiRequest) {
  switch (req.method) {
    case 'GET':
      return getAllRecipeData();
    case 'POST':
      return postRecipe(req.body);
    default:
      throw Error();
  }
}

export default handler;
