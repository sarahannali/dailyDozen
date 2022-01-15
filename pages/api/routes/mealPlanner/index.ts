import type { NextApiRequest } from 'next';
import { StatusCodes } from 'http-status-codes';
import { getMealEvents, createMealEvent } from '../../../../lib/mealEvents';
import apiHandler from '../../middleware/apiHandler';
import { ErrorWithStatus } from '../../middleware/errorHandler';

function handler(req: NextApiRequest) {
  switch (req.method) {
    case 'GET':
      return getMealEvents(req.query.date as string);
    case 'POST':
      return createMealEvent(req.body);
    default:
      throw ErrorWithStatus(StatusCodes.METHOD_NOT_ALLOWED, 'Method not allowed');
  }
}

export default apiHandler(handler);
