import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { SeasonProps } from 'src/core/scrapper/animes-online'
import { EpisodeList } from 'src/domain/enterprise/entities/episode-list'
import { Season } from 'src/domain/enterprise/entities/season'
import { makeEpisodeUseCase } from './make-episode'

export function makeSeasonUseCase(data: SeasonProps) {
  const season = Season.create({
    animeId: new UniqueEntityId(), // WILL BE SUBSCRIPT
    title: data.title,
    episodes: new EpisodeList(data.episodes.map(makeEpisodeUseCase)),
  })

  return season
}
