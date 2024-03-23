import { Either, failure, success } from '@/core/either'
import { AnimesRepository } from '../repositories/animes.repository'
import { GenresRepository } from '../repositories/genres.repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { Anime } from '@/domain/enterprise/entities/anime'

interface FetchAnimesByGenreUseCaseRequest {
  genreSlug: string
  page: number
}

type FetchAnimesByGenreUseCaseResponse = Either<
  ResourceNotFoundError,
  { animes: Anime[] }
>

export class FetchAnimesByGenreUseCase {
  constructor(
    private animesRepository: AnimesRepository,
    private genresRepository: GenresRepository,
  ) {}

  async execute({
    genreSlug,
    page,
  }: FetchAnimesByGenreUseCaseRequest): Promise<FetchAnimesByGenreUseCaseResponse> {
    const genre = await this.genresRepository.findBySlug(genreSlug)

    if (!genre) {
      return failure(new ResourceNotFoundError())
    }

    const animes = await this.animesRepository.findManyByGenre(genreSlug, {
      page,
    })

    return success({ animes })
  }
}
