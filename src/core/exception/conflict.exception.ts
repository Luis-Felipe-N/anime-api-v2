import { HttpStatus } from '../enums/http-status.enum'
import { createHttpExceptionBody } from '../uteis/http-exception-body'
import { HttpException } from './http-request.exception'

export class ConflictException extends HttpException {
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    message?: string | object | any,
    error = 'Conflict',
  ) {
    super(
      createHttpExceptionBody(message, error, HttpStatus.CONFLICT),
      HttpStatus.UNAUTHORIZED,
    )
  }
}
