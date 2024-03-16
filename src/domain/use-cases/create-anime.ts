import { Anime } from '../entities/Anime'
import { AnimesRepository } from '../repositories/animes.repository'

interface CreateAnimeUseCaseRequest {
  banner: string
  cover: string
  description: string
  title: string
}

export class CreateAnimeUseCase {
  constructor(private animesRepository: AnimesRepository) {}

  async execute({
    banner,
    cover,
    description,
    title,
  }: CreateAnimeUseCaseRequest) {
    const anime = new Anime({
      banner,
      cover,
      description,
      title,
    })

    await this.animesRepository.create(anime)

    console.log(anime)

    return { anime }
  }
}
