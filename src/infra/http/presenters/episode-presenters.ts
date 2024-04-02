import { Episode } from '@/domain/enterprise/entities/episode'
import { SeasonPresenter } from './season-presenters'

export class EpisodePresenter {
  static toHTTP(episode: Episode) {
    return {
      id: episode.id.toString(),
      title: episode.title,
      slug: episode.slug.value,
      description: episode.description,
      cover: episode.cover,
      createdAt: episode.createdAt,
      duration: episode.duration,
      index: episode.index,
      isNew: episode.isNew,
      type: episode.type,
      video: episode.video,
      seasonId: episode.seasonId.toString(),
      season: episode.season && SeasonPresenter.toHTTP(episode.season),
    }
  }
}
