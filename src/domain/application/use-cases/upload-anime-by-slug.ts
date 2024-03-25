import AnimesOnlineScrapper from '@/core/scrapper/animes-online'
import { AnimesRepository } from '../repositories/animes.repository'
import { Either, failure, success } from '@/core/either'
import { UploadAnimeError } from './errors/upload-anime-error'
import { Anime } from '@/domain/enterprise/entities/anime'
import { Season } from '@/domain/enterprise/entities/season'
import { SeasonList } from '@/domain/enterprise/entities/season-list'
import { Genre } from '@/domain/enterprise/entities/genre'
import { GenreList } from '@/domain/enterprise/entities/genre-list'
import { EpisodeList } from '@/domain/enterprise/entities/episode-list'
import { Episode } from '@/domain/enterprise/entities/episode'

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
    const animePrisma = await this.animesRepository.findBySlug(slug)
    const scraper = new AnimesOnlineScrapper()

    const result = await scraper.getAnimeBySlug(slug, true)

    if (result.isFailure()) {
      return failure(new UploadAnimeError())
    }

    const anime = Anime.create(
      {
        banner: result.value.anime.banner,
        cover: result.value.anime.cover,
        description: result.value.anime.description,
        nsfw: result.value.anime.nsfw,
        title: result.value.anime.title,
        trailerYtId: result.value.anime.trailerYtId,
      },
      animePrisma?.id,
    )

    console.log()

    const animeSeasons = result.value.seasons.map((season) =>
      Season.create(
        {
          title: season.title,
          animeId: anime.id,
          episodes: new EpisodeList(
            result.value.episodes.map((episode) =>
              Episode.create({
                title: episode.title,
                description: episode.description,
                index: episode.index,
                type: episode.type,
                cover: episode.cover,
                duration: episode.duration,
                video: episode.video,
                seasonId: season.id,
              }),
            ),
          ),
        },
        season.id,
      ),
    )

    const animeGenres = result.value.genres.map((genre) =>
      Genre.create({
        title: genre.title,
        animeId: anime.id,
      }),
    )

    anime.seasons = new SeasonList(animeSeasons)
    anime.genres = new GenreList(animeGenres)

    if (animePrisma) {
      await this.animesRepository.save(anime)
    } else {
      await this.animesRepository.create(anime)
    }

    return success({ anime })
  }
}
