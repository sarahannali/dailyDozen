import { getMealEvents, createMealEvent } from '../../../../lib/mealEvents';
import apiHandler from '../../middleware/apiHandler';

async function handler(req, res) {
  let result;

  if (req.method == 'GET') result = await getMealEvents(req.query.date);
  else if (req.method == 'POST') result = await createMealEvent(req.body);

  return res.status(200).json(result);
}

export default apiHandler(handler);