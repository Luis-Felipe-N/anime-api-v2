import { Entity } from '../core/entities/entity'
import { Slug } from '../values-objects/slug'

interface MovieProps {
  title: string
  description: string
  slug: Slug
  banner: string
  cover: string

  duration: number
}

export class Movie extends Entity<MovieProps> {}
