import { Anime } from 'src/domain/enterprise/entities/anime'
import { GenrePresenter } from './genre-presenters'
import { SeasonPresenter } from './season-presenters'

export class AnimePresenter {
  static toHTTP(anime: Anime) {
    return {
      id: anime.id.toString(),
      title: anime.title,
      slug: anime.slug.value,
      description: anime.description,
      banner: anime.banner,
      cover: anime.cover,
      nsfw: anime.nsfw,
      genres: anime.genres.getItems().map(GenrePresenter.toHTTP),
      seasons: anime.seasons.getItems().map(SeasonPresenter.toHTTP),
      trailerYtId: anime.trailerYtId,
      createdAt: anime.createdAt,
      updatedAt: anime.updatedAt,
      rating: anime.rating,
    }
  }
}
