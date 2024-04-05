import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { SeasonProps } from '@/core/scrapper/animes-online'
import { EpisodeList } from '@/domain/enterprise/entities/episode-list'
import { Season } from '@/domain/enterprise/entities/season'
import { makeEpisodeUseCase } from './make-episode'

export function makeSeasonUseCase(data: SeasonProps) {
  
  const season = Season.create({
    animeId: new UniqueEntityId(), // WILL BE SUBSCRIPT
    title: data.title,
    episodes: new EpisodeList(data.episodes.map(makeEpisodeUseCase)),
  })

  return season
}
