import { deleteMealEvent, updateMealEvent } from '../../../lib/mealEvents';

export default async function handler(req, res) {
  let result;

  if (req.method == 'POST') result = await updateMealEvent(req.query.id, req.body)
  if (req.method == 'DELETE') result = await deleteMealEvent(req.query.id);

  return res.status(200).json(result);
}