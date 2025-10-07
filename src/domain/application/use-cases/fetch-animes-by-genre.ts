import { Either, success } from '../../../core/either'
import { AnimesRepository } from '../repositories/animes.repository'
import { GenresRepository } from '../repositories/genres.repository'
import { Anime } from '../../enterprise/entities/anime'

interface FetchAnimesByGenreUseCaseRequest {
  genreSlug: string
  page: number
}

type FetchAnimesByGenreUseCaseResponse = Either<null, { animes: Anime[] }>

export class FetchAnimesByGenreUseCase {
  constructor(
    private animesRepository: AnimesRepository,
    private genresRepository: GenresRepository,
  ) {}

  async execute({
    genreSlug,
    page,
  }: FetchAnimesByGenreUseCaseRequest): Promise<FetchAnimesByGenreUseCaseResponse> {
    const animes = await this.animesRepository.findManyByGenre(genreSlug, {
      page,
    })

    return success({ animes })
  }
}
