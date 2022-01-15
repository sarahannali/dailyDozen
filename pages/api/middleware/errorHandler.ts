import type { NextApiResponse } from 'next';
import { ErrorWithStatus as ErrorWithStatusType } from '../../../utils/propTypes';

export const ErrorWithStatus = (status: number, message: string) => {
  const err = new Error(message) as ErrorWithStatusType;
  err.status = status;

  return err;
};

const errorHandler = (
  err: ErrorWithStatusType,
  res: NextApiResponse,
) => res.status(err.status).json(err.message);

export default errorHandler;
