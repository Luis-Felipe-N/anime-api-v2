import { Entity } from '../core/entities/entity'

interface MovieProps {
  title: string
  description: string
  banner: string
  cover: string

  duration: number
}

export class Movie extends Entity<MovieProps> {}
