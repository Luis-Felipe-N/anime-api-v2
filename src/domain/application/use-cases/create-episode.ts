import { EpisodesRepository } from '../repositories/episode.repository'
import { Episode } from '@/domain/enterprise/entities/Episode'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface CreateEpisodeUseCaseRequest {
  animeId: string
  title: string
  description: string
  cover: string
  index: number
  duration: number
}

interface CreateEpisodeUseCaseResponse {
  episode: Episode
}

export class CreateEpisodeUseCase {
  constructor(private episodesRepository: EpisodesRepository) {}

  async execute({
    animeId,
    title,
    cover,
    description,
    duration,
    index,
  }: CreateEpisodeUseCaseRequest): Promise<CreateEpisodeUseCaseResponse> {
    const episode = Episode.create({
      animeId: new UniqueEntityId(animeId),
      title,
      description,
      cover,
      index,
      duration,
    })

    await this.episodesRepository.create(episode)

    return { episode }
  }
}
