import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { GenreProps } from 'src/core/scrapper/animes-online'

import { Genre } from 'src/domain/enterprise/entities/genre'

export function makeGenreUseCase(data: GenreProps) {
  const genre = Genre.create({
    animeId: new UniqueEntityId(), // WILL BE SUBSCRIPT
    title: data.title,
  })

  return genre
}
