import { postMealEvent } from '../../../lib/mealEvents';

export default async function handler(req, res) {
  const result = await postMealEvent(req.body);

  return res.status(200).json(result);
}