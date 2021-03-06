import { HttpBadRequestError, HttpInternalServerError, HttpError, ErrorStatusCode } from './http';
import { InputValidationError, RuntimeError } from './runtime';
import { format } from '@redtea/format-axios-error';
import { AxiosError } from 'axios';

/**
 * Convert input error to corresponding instance of HttpError
 *
 * @param {Error | AxiosError | RuntimeError} error Input error
 * @returns {HttpError}
 */
export function convertToHttpError(error: Error | AxiosError | RuntimeError): HttpError {
  const axiosError = (<AxiosError>error).isAxiosError && format(<AxiosError>error);

  if (error instanceof InputValidationError) {
    return new HttpBadRequestError(error.message, error.details);
  }
  if (error instanceof RuntimeError) {
    return new HttpInternalServerError(error.message, error.details);
  }

  if (axiosError) {
    return new HttpError(
      axiosError.response?.status as ErrorStatusCode,
      axiosError.response?.statusText || 'Internal Server Error',
      axiosError.message,
    );
  }

  return new HttpInternalServerError(error.message);
}
