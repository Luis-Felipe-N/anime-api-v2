import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Episode, EpisodeProps } from '@/domain/enterprise/entities/Episode'
import { faker } from '@faker-js/faker'

export function makeEpisode(override: Partial<EpisodeProps> = {}) {
  const episode = Episode.create({
    animeId: new UniqueEntityId('anime-id'),
    title: faker.lorem.sentence(),
    description: faker.lorem.text(),
    cover: faker.image.url(),
    duration: 800,
    index: 0,
    season: 1,
    ...override,
  })

  console.log(episode)

  return episode
}
