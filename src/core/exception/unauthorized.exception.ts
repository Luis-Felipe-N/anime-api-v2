import { HttpStatus } from '../enums/http-status.enum'
import { createHttpExceptionBody } from '../uteis/http-exception-body'
import { HttpException } from './http-request.exception'

export class UnauthorizedException extends HttpException {
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    message?: string | object | any,
    error = 'Unauthorized',
  ) {
    super(
      createHttpExceptionBody(message, error, HttpStatus.UNAUTHORIZED),
      HttpStatus.UNAUTHORIZED,
    )
  }
}
