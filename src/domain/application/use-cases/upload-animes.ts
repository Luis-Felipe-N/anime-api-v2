import AnimesOnlineScrapper from '@/core/scrapper/animes-online'
import { AnimesRepository } from '../repositories/animes.repository'
import { Either, failure } from '@/core/either'
import { UploadAnimeError } from './errors/upload-anime-error'
import { Anime } from '@/domain/enterprise/entities/anime'
import { SeasonList } from '@/domain/enterprise/entities/season-list'
import { GenreList } from '@/domain/enterprise/entities/genre-list'
import { makeAnimeUseCase } from '../factories/make-anime'
import { makeSeasonUseCase } from '../factories/make-season'
import { makeGenreUseCase } from '../factories/make-genre'

type UploadAnimesUseCaseResponse = Either<
  UploadAnimeError,
  {
    anime: Anime
  }
>

export class UploadAnimesUseCase {
  constructor(private animesRepository: AnimesRepository) {}

  async execute() {
    const scraper = new AnimesOnlineScrapper()

    const slugsResult = await scraper.getAll()

    if (slugsResult.isSuccess()) {
      slugsResult.value.slugs.forEach(async (slug) => {
        const result = await scraper.getAnimeBySlug(slug, true)
        console.log(slugsResult.value.slugs, slug)

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
      })
    }
  }
}
