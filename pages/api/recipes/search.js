import { getRecipeSearch } from '../../../lib/recipes';

export default async function handler(req, res) {
  const searchValue = JSON.parse(JSON.stringify(req.body))["searchValue"];
  const result = await getRecipeSearch(searchValue);

  return res.status(200).json(result);
}