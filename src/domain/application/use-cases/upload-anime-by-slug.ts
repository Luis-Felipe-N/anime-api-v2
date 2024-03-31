import AnimesOnlineScrapper from '@/core/scrapper/animes-online'
import { AnimesRepository } from '../repositories/animes.repository'
import { Either, failure, success } from '@/core/either'
import { UploadAnimeError } from './errors/upload-anime-error'
import { Anime } from '@/domain/enterprise/entities/anime'

import { SeasonList } from '@/domain/enterprise/entities/season-list'
import { GenreList } from '@/domain/enterprise/entities/genre-list'
import { makeAnimeUseCase } from '../factories/make-anime'
import { makeSeasonUseCase } from '../factories/make-season'
import { makeGenreUseCase } from '../factories/make-genre'

interface UploadAnimeBySlugUseCaseProps {
  slug: string
}

type UploadAnimeBySlugUseCaseResponse = Either<
  UploadAnimeError,
  {
    anime: Anime
  }
>

export class UploadAnimeBySlugUseCase {
  constructor(private animesRepository: AnimesRepository) {}

  async execute({
    slug,
  }: UploadAnimeBySlugUseCaseProps): Promise<UploadAnimeBySlugUseCaseResponse> {
    const scraper = new AnimesOnlineScrapper()

    const result = await scraper.getAnimeBySlug(slug, true)

    if (result.isFailure()) {
      return failure(new UploadAnimeError())
    }

    const anime = makeAnimeUseCase(result.value.anime)

    const animeSeasons = result.value.seasons.map((season) =>
      makeSeasonUseCase(season),
    )

    const animeGenres = result.value.genres.map((genre) =>
      makeGenreUseCase(genre),
    )

    anime.seasons = new SeasonList(animeSeasons)
    anime.genres = new GenreList(animeGenres)

    await this.animesRepository.createFromScrapper(anime)

    return success({ anime })
  }
}
