import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Slug } from '@/core/values-objects/slug'
import { Episode, EpisodeProps } from '@/domain/enterprise/entities/Episode'

export function makeEpisode(override: Partial<EpisodeProps> = {}) {
  const episode = Episode.create({
    animeId: new UniqueEntityId('anime-id'),
    title: 'Titulo do episódio',
    slug: Slug.create('titulo-do-episodio'),
    description: 'Descrição do episódio',
    cover: 'episode-cover-link',
    duration: 800,
    index: 0,
    season: 1,
    ...override,
  })

  return episode
}
