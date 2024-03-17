import { UseCaseError } from '@/core/errors/use-case-errors'

export class UserAlreadyExistsError extends Error implements UseCaseError {
  constructor() {
    super('User with e-email already exits')
  }
}
