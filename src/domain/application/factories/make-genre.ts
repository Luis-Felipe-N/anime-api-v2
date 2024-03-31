import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { GenreProps } from '@/core/scrapper/animes-online'

import { Genre } from '@/domain/enterprise/entities/genre'

export function makeGenreUseCase(data: GenreProps) {
  const genre = Genre.create({
    animeId: new UniqueEntityId(), // WILL BE SUBSCRIPT
    title: data.title,
  })

  return genre
}
