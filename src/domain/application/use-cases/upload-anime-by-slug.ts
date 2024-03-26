import AnimesOnlineScrapper, {
  EpisodeProps,
} from '@/core/scrapper/animes-online'
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
          episodes: new EpisodeList(season.episodes.map(this.toDomain)),
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

    await this.animesRepository.createFromScrapper(anime)

    return success({ anime })
  }

  private toDomain(episode: EpisodeProps) {
    return Episode.create({
      title: episode.title,
      cover: episode.cover,
      description: episode.description,
      duration: episode.duration,
      index: episode.index,
      slug: episode.slug,
      createdAt: episode.createdAt,
      type: episode.type,
      video: episode.video,
    })
  }
}
