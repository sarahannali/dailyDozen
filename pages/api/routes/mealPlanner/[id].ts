import type { NextApiRequest } from 'next';
import { StatusCodes } from 'http-status-codes';
import {
  deleteMealEvent, updateMealEvent,
} from '../../../../lib/mealEvents';
import apiHandler from '../../middleware/apiHandler';
import { ErrorWithStatus } from '../../middleware/errorHandler';

function handler(req: NextApiRequest) {
  switch (req.method) {
    case 'POST':
      return updateMealEvent(req.query.id as string, req.body);
    case 'DELETE':
      return deleteMealEvent(req.query.id as string);
    default:
      throw ErrorWithStatus(StatusCodes.METHOD_NOT_ALLOWED, 'Method not allowed');
  }
}

export default apiHandler(handler);
