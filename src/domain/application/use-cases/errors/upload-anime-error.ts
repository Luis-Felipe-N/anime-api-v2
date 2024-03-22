import { UseCaseError } from '@/core/errors/use-case-errors'

export class UploadAnimeError extends Error implements UseCaseError {
  constructor() {
    super('Anime Upload Error')
  }
}
