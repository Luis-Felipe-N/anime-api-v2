import { Entity } from '../core/entities/entity'
import { UniqueEntityId } from '../core/entities/unique-entity-id'
import { Optional } from '../core/types/optional'

interface EpisodeProps {
  animeId: UniqueEntityId
  index: number
  title: string
  description: string
  cover: string
  duration: string
  createdAt: Date
}

export class Episode extends Entity<EpisodeProps> {
  static create(
    props: Optional<EpisodeProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const episode = new Episode(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return episode
  }
}
