import type { NextApiRequest } from 'next';
import { StatusCodes } from 'http-status-codes';
import { getNutritionGoalData, postNutritionGoalData } from '../../../../lib/goals';
import apiHandler from '../../middleware/apiHandler';
import { ErrorWithStatus } from '../../middleware/errorHandler';

function handler(req: NextApiRequest) {
  switch (req.method) {
    case 'GET':
      return getNutritionGoalData();
    case 'POST':
      return postNutritionGoalData(req.body);
    default:
      throw ErrorWithStatus(StatusCodes.METHOD_NOT_ALLOWED, 'Method not allowed');
  }
}

export default apiHandler(handler);
