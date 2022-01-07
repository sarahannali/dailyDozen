import { postNutritionGoalData } from '../../../../lib/goals';
import apiHandler from '../../middleware/apiHandler';

async function handler(req, res) {
  let result;

  if (req.method == 'POST') result = await postNutritionGoalData(req.body);

  return res.status(200).json(result);
}

export default apiHandler(handler);