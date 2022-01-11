import { StatusCodes } from 'http-status-codes';

interface ErrorWithStatus extends Error {
  status: StatusCodes
}

export default ErrorWithStatus;
