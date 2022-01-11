import type { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import { getMealEvents, createMealEvent } from '../../../../lib/mealEvents';
import apiHandler from '../../middleware/apiHandler';
import { ErrorWithStatus } from '../../../../utils/propTypes';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  let result: string;

  if (req.method === 'GET') {
    if (typeof req.query.date === 'string') result = (await getMealEvents(req.query.date)).toString();
    else {
      const err = new Error('Can only request start date for meal events') as ErrorWithStatus;
      err.status = StatusCodes.BAD_REQUEST;

      throw err;
    }
  } else if (req.method === 'POST') result = await createMealEvent(req.body);

  return res.status(200).json(result);
}

export default apiHandler(handler);
