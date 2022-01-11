import type { NextApiRequest, NextApiResponse } from 'next';
import { updateGroceryList } from '../../../../lib/groceryList';
import apiHandler from '../../middleware/apiHandler';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') await updateGroceryList(req.body);

  return res.status(200).json('');
}

export default apiHandler(handler);
