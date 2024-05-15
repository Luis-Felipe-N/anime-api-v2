import { Season } from '@/domain/enterprise/entities/season'
import { EpisodePresenter } from './episode-presenters'
import { AnimePresenter } from './anime-presenters'

interface SeasonPresenterResponse {
  id: string,
  title: string,
  slug: string,
  animeId: string,
  episodes: any,
  createdAt: Date | null,
  updatedAt: Date | null | undefined,
  anime: any,
}

export class SeasonPresenter {
  static toHTTP(season: Season): SeasonPresenterResponse {
    return {
      id: season.id.toString(),
      title: season.title,
      slug: season.slug.value,
      animeId: season.animeId.toString(),
      episodes: season.episodes.getItems().map(EpisodePresenter.toHTTP),
      createdAt: season.createdAt,
      updatedAt: season.updatedAt,
      anime: season.anime && AnimePresenter.toHTTP(season.anime),
    }
  }
}
