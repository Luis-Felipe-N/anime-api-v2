import { Either, success } from '@/core/either'
import { AnimesRepository } from '@/domain/application/repositories/animes.repository'
import { Anime } from '@/domain/enterprise/entities/Anime'

interface CreateAnimeUseCaseRequest {
  banner: string
  cover: string
  description: string
  title: string
}

type CreateAnimeUseCaseResponse = Either<
  null,
  {
    anime: Anime
  }
>

export class CreateAnimeUseCase {
  constructor(private animesRepository: AnimesRepository) {}

  async execute({
    banner,
    cover,
    description,
    title,
  }: CreateAnimeUseCaseRequest): Promise<CreateAnimeUseCaseResponse> {
    const anime = Anime.create({
      banner,
      cover,
      description,
      title,
    })

    await this.animesRepository.create(anime)

    return success({ anime })
  }
}
