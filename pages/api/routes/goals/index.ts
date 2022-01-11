import type { NextApiRequest, NextApiResponse } from 'next';
import { postNutritionGoalData } from '../../../../lib/goals';
import apiHandler from '../../middleware/apiHandler';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') await postNutritionGoalData(req.body);

  return res.status(200).json('');
}

export default apiHandler(handler);
