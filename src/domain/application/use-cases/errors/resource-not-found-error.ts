import { UseCaseError } from '../../../../core/exception/use-case-errors'

export class ResourceNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Resource not found')
  }
}
