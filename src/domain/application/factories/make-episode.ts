import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { EpisodeProps } from 'src/core/scrapper/animes-online'
import { Episode } from 'src/domain/enterprise/entities/episode'

export function makeEpisodeUseCase(data: EpisodeProps) {
  const episode = Episode.create({
    seasonId: new UniqueEntityId(), // WILL BE SUBSCRIPT
    title: data.title,
    cover: data.cover,
    description: data.description,
    duration: data.duration,
    index: data.index,
    slug: data.slug,
    createdAt: data.createdAt,
    type: data.type,
    video: data.video,
  })

  return episode
}
