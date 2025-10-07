import { Entity } from 'src/core/entities/entity'
import { Slug } from 'src/core/values-objects/slug'
import { Optional } from 'src/core/types/optional'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { EpisodeList } from './episode-list'
import { Anime } from './anime'

export interface SeasonProps {
  title: string
  slug: Slug
  animeId: UniqueEntityId
  episodes: EpisodeList
  createdAt: Date
  updatedAt?: Date | null
  anime?: Anime | null
}

export class Season extends Entity<SeasonProps> {
  get title() {
    return this.props.title
  }

  get slug() {
    return this.props.slug
  }

  get episodes() {
    return this.props.episodes
  }

  get animeId() {
    return this.props.animeId
  }

  set episodes(episodes: EpisodeList) {
    this.props.episodes = episodes
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get anime() {
    return this.props.anime
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<SeasonProps, 'createdAt' | 'slug' | 'episodes'>,
    id?: UniqueEntityId,
  ) {
    const season = new Season(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: new Date(),
        episodes: props.episodes ?? new EpisodeList(),
      },
      id,
    )

    return season
  }
}
