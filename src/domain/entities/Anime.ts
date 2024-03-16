import { Entity } from '../core/entities/entity'
import { Slug } from '../values-objects/slug'

interface AnimeProps {
  title: string
  description: string
  slug: Slug
  banner: string
  cover: string
}

export class Anime extends Entity<AnimeProps> {
  get title() {
    return this.props.title
  }
}
