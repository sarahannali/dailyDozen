import type { NextApiRequest } from 'next';
import { StatusCodes } from 'http-status-codes';
import { createUserRecipe } from '../../../../lib/userRecipes';
import apiHandler from '../../middleware/apiHandler';
import { ErrorWithStatus } from '../../middleware/errorHandler';

function handler(req: NextApiRequest) {
  switch (req.method) {
    case 'POST':
      return createUserRecipe(req.body);
    default:
      throw ErrorWithStatus(StatusCodes.METHOD_NOT_ALLOWED, 'Method not allowed');
  }
}

export default apiHandler(handler);
