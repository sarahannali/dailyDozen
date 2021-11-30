import { postNutritionGoalData } from '../../../lib/goals';

export default async function handler(req, res) {
  const result = await postNutritionGoalData(req.body);

  return res.status(200).json(result);
}