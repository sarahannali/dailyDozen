import { postNutritionGoalData } from '../../../lib/goals';

export default async function handler(req, res) {
  let result;

  if (req.method == 'POST') result = await postNutritionGoalData(req.body);

  return res.status(200).json(result);
}