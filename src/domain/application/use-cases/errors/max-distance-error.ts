import { UseCaseError } from '@/core/errors/use-case-errors'

export class MaxDistanceError extends Error implements UseCaseError {
  constructor() {
    super('Max distance reached.')
  }
}
