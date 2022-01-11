import type { NextApiRequest, NextApiResponse } from 'next';
import errorHandler from './errorHandler';

type Handler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

const apiHandler = (handler: Handler) => async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    return await handler(req, res);
  } catch (err) {
    return errorHandler(err, res);
  }
};

export default apiHandler;
