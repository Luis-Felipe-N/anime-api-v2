import { Entity } from '../core/entities/entity'
import { UniqueEntityId } from '../core/entities/unique-entity-id'

interface EpisodeProps {
  animeId: UniqueEntityId
  index: number
  title: string
  description: string
  cover: string
  duration: string
  createdAt: Date
}

export class Episode extends Entity<EpisodeProps> {}
