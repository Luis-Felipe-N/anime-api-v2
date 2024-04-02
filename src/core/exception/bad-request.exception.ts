import { HttpStatus } from '../enums/http-status.enum'
import { createHttpExceptionBody } from '../uteis/http-exception-body'
import { HttpException } from './http-request.exception'

export class BadRequestException extends HttpException {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(message?: string | object | any, error = 'Bad Request') {
    super(
      createHttpExceptionBody(message, error, HttpStatus.BAD_REQUEST),
      HttpStatus.BAD_REQUEST,
    )
  }
}
