import { updateGroceryList } from '../../../../lib/groceryList';
import apiHandler from '../../middleware/apiHandler';

async function handler(req, res) {
  let result;

  if (req.method == 'POST') result = await updateGroceryList(req.body);

  return res.status(200).json(result);
}

export default apiHandler(handler);