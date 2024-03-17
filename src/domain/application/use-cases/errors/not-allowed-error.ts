import { UseCaseError } from '@/core/errors/use-case-errors'

export class NotAllowedError extends Error implements UseCaseError {
  constructor() {
    super('Not allowed')
  }
}
