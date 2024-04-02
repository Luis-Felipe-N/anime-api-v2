import { UseCaseError } from '@/core/exception/use-case-errors'

export class UploadAnimeError extends Error implements UseCaseError {
  constructor() {
    super('Anime Upload Error')
  }
}
