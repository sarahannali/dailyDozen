import type { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import { deleteMealEvent, updateMealEvent } from '../../../../lib/mealEvents';
import apiHandler from '../../middleware/apiHandler';
import { ErrorWithStatus } from '../../../../utils/propTypes';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  let result: string;

  if (typeof req.query.id === 'string') {
    if (req.method === 'POST') result = await updateMealEvent(req.query.id, req.body);
    if (req.method === 'DELETE') result = await deleteMealEvent(req.query.id);
  } else {
    const err = new Error('Cannot update more than one meal event') as ErrorWithStatus;
    err.status = StatusCodes.BAD_REQUEST;

    throw err;
  }

  return res.status(200).json(result);
}

export default apiHandler(handler);
