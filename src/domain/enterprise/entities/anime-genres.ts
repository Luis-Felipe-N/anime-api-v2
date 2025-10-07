import { Entity } from 'src/core/entities/entity'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'

export interface AnimeGenresProps {
  animeId: UniqueEntityId
  genreId: UniqueEntityId
}

export class AnimeGenres extends Entity<AnimeGenresProps> {
  get animeId() {
    return this.props.animeId
  }

  get genreId() {
    return this.props.animeId
  }

  static create(props: AnimeGenresProps, id?: UniqueEntityId) {
    const genre = new AnimeGenres(
      {
        ...props,
      },
      id,
    )

    return genre
  }
}
