import type { NextApiResponse } from 'next';
import { ErrorWithStatus } from '../../../utils/propTypes';

const errorHandler = (
  err: ErrorWithStatus,
  res: NextApiResponse,
) => res.status(err.status).json(err.message);

export default errorHandler;
