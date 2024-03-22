import AnimesOnlineScrapper from '@/core/scrapper/animes-online'
import { AnimesRepository } from '../repositories/animes.repository'
import { Either, failure, success } from '@/core/either'
import { UploadAnimeError } from './errors/upload-anime-error'
import { Anime } from '@/domain/enterprise/entities/anime'
import { Season } from '@/domain/enterprise/entities/season'
import { SeasonList } from '@/domain/enterprise/entities/season-list'
import { Slug } from '@/core/values-objects/slug'

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

    const anime = Anime.create({
      banner: result.value.anime.banner,
      cover: result.value.anime.cover,
      description: result.value.anime.description,
      nsfw: result.value.anime.nsfw,
      title: result.value.anime.title,
      trailerYtId: result.value.anime.trailerYtId,
    })

    const animeSeasons = result.value.seasons.map((season) =>
      Season.create(
        {
          title: season.title,
          animeId: anime.id,
          ...season.props,
        },
        season.id,
      ),
    )

    anime.seasons = new SeasonList(animeSeasons)

    await this.animesRepository.create(anime)

    return success({ anime })
  }
}
