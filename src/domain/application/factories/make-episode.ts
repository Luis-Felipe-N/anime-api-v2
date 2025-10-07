import { UniqueEntityId } from '../../../core/entities/unique-entity-id'
import { EpisodeProps } from '../../../core/scrapper/animes-online'
import { Episode } from '../../enterprise/entities/episode'

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
