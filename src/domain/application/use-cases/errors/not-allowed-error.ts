import { UseCaseError } from 'src/core/exception/use-case-errors'

export class NotAllowedError extends Error implements UseCaseError {
  constructor() {
    super('Not allowed')
  }
}
