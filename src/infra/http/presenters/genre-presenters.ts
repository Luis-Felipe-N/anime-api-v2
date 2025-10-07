import { Genre } from '../../../domain/enterprise/entities/genre'

export class GenrePresenter {
  static toHTTP(genre: Genre) {
    return {
      id: genre.id.toString(),
      title: genre.title,
      slug: genre.slug.value,
      animeId: genre.animeId.toString(),
    }
  }
}
