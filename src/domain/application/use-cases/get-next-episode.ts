import { Episode } from 'src/domain/enterprise/entities/episode'
import { EpisodesRepository } from '../repositories/episode.repository'
import { Either, failure, success } from 'src/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { SeasonsRepository } from '../repositories/seasons-repository'
import { AnimesRepository } from '../repositories/animes.repository'

interface GetNextEpisodeUseCaseRequest {
  animeId: string
  seasonId: string
  currentEpisodeIndex: number
}

type GetNextEpisodeUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    episode: Episode
  }
>

export class GetNextEpisodeUseCase {
  constructor(
    private episodesRepository: EpisodesRepository,
    private seasonsRepository: SeasonsRepository,
    private animesRepository: AnimesRepository,
  ) {}

  async execute({
    animeId,
    seasonId,
    currentEpisodeIndex,
  }: GetNextEpisodeUseCaseRequest): Promise<GetNextEpisodeUseCaseResponse> {
    const anime = await this.animesRepository.findById(animeId)

    if (!anime) {
      return failure(new ResourceNotFoundError())
    }

    const seasons = await this.seasonsRepository.findManyByAnime(animeId)

    if (!seasons) {
      return failure(new ResourceNotFoundError())
    }

    const seasonIndex = seasons.findIndex(
      (item) => item.id.toString() === seasonId,
    )

    const season = seasons[seasonIndex]

    if (!season) {
      return failure(new ResourceNotFoundError())
    }

    const episode = await this.episodesRepository.findByIndex(
      season.id.toString(),
      currentEpisodeIndex + 1,
    )

    if (episode) {
      return success({ episode })
    }

    const nextSeason = seasons[seasonIndex + 1]

    if (!episode && !nextSeason) {
      return failure(new ResourceNotFoundError())
    }

    const episodeNextSeason = await this.episodesRepository.findByIndex(
      nextSeason.id.toString(),
      1,
    )

    if (!episodeNextSeason) {
      return failure(new ResourceNotFoundError())
    }

    return success({ episode: episodeNextSeason })
  }
}
