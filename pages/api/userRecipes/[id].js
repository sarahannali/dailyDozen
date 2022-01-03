import { updateUserRecipe } from '../../../lib/userRecipes';

export default async function handler(req, res) {
  let result;

  if (req.method == 'POST') result = await updateUserRecipe(req.query.id, req.body);

  return res.status(200).json(result);
}