import { Entity } from '../core/entities/entity'

interface AnimeProps {
  title: string
  description: string
  banner: string
  cover: string
}

export class Anime extends Entity<AnimeProps> {
  get title() {
    return this.props.title
  }
}
