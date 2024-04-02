import { UseCaseError } from '@/core/exception/use-case-errors'

export class NotAllowedError extends Error implements UseCaseError {
  constructor() {
    super('Not allowed')
  }
}
