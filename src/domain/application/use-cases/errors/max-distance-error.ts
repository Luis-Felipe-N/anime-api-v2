import { UseCaseError } from '@/core/exception/use-case-errors'

export class MaxDistanceError extends Error implements UseCaseError {
  constructor() {
    super('Max distance reached.')
  }
}
