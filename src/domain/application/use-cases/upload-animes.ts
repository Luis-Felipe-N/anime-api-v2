import AnimesOnlineScrapper from '@/core/scrapper/animes-online'
import { AnimesRepository } from '../repositories/animes.repository'
import { failure } from '@/core/either'
import { UploadAnimeError } from './errors/upload-anime-error'
import { SeasonList } from '@/domain/enterprise/entities/season-list'
import { GenreList } from '@/domain/enterprise/entities/genre-list'
import { makeAnimeUseCase } from '../factories/make-anime'
import { makeSeasonUseCase } from '../factories/make-season'
import { makeGenreUseCase } from '../factories/make-genre'

interface UploadAnimesUseCaseRequest {
  genre: string
  page: number
}

export class UploadAnimesUseCase {
  constructor(private animesRepository: AnimesRepository) {}

  async execute({ genre, page }: UploadAnimesUseCaseRequest) {
    const scraper = new AnimesOnlineScrapper()

    const slugsResult = await scraper.getSlugsFromPage(genre, page)

    
    if (slugsResult.isSuccess()) {
      ;(async () => {
        for await (const slug of slugsResult.value.slugs) {
          const result = await scraper.getAnimeBySlug(slug.trim())
          

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
          console.log('ANIME: ', anime.slug)
        }
      })()
    }
  }
}
