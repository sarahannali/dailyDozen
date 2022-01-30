import type { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '../../../firebase/clientApp';
import { ErrorWithStatus } from '../../../utils/propTypes';
import errorHandler from './errorHandler';

type Handler = (req: NextApiRequest, res: NextApiResponse) => Promise<any>;

const apiHandler = (handler: Handler) => async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log('USER IN API HANDLER: ', auth.currentUser);
    const result = await handler(req, res);
    return res.status(200).json(result);
  } catch (err) {
    return errorHandler(err as ErrorWithStatus, res);
  }
};

export default apiHandler;
