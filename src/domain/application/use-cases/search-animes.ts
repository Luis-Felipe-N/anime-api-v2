import { Either, success } from '@/core/either'
import { AnimesRepository } from '../repositories/animes.repository'
import { Anime } from '@/domain/enterprise/entities/anime'

interface SearchAnimeUseCaseRequest {
  keyword: string
  page: number
}

type SearchAnimeUseCaseResponse = Either<null, { animes: Anime[] }>

export class SearchAnimeUseCase {
  constructor(
    private animesRepository: AnimesRepository,
    // private genresRepository: GenresRepository,
  ) {}

  async execute({
    keyword,
    page,
  }: SearchAnimeUseCaseRequest): Promise<SearchAnimeUseCaseResponse> {
    const animes = await this.animesRepository.findManyByKeyword(keyword, {
      page,
    })

    return success({ animes })
  }
}
