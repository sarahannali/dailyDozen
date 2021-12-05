import { createMealEvent } from '../../../lib/mealEvents';

export default async function handler(req, res) {
  let result;

  if (req.method == 'POST') result = await createMealEvent(req.body);

  return res.status(200).json(result);
}