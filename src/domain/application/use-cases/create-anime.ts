import { Either, success } from '@/core/either'
import { Optional } from '@/core/types/optional'
import { AnimesRepository } from '@/domain/application/repositories/animes.repository'
import { Anime } from '@/domain/enterprise/entities/anime'
import { Genre } from '@/domain/enterprise/entities/genre'
import { GenreList } from '@/domain/enterprise/entities/genre-list'
import { Season } from '@/domain/enterprise/entities/season'
import { SeasonList } from '@/domain/enterprise/entities/season-list'

interface CreateAnimeUseCaseRequest {
  banner: string | null
  cover: string | null
  description: string
  title: string
  nsfw: boolean
  trailerYtId?: string | null
  seasons: Optional<Season, 'slug'>[]
  genres: Optional<Genre, 'slug'>[]
}

type CreateAnimeUseCaseResponse = Either<
  null,
  {
    anime: Anime
  }
>

export class CreateAnimeUseCase {
  constructor(private animesRepository: AnimesRepository) {}

  async execute({
    banner,
    cover,
    description,
    title,
    seasons,
    genres,
    nsfw,
    trailerYtId = null,
  }: CreateAnimeUseCaseRequest): Promise<CreateAnimeUseCaseResponse> {
    const anime = Anime.create({
      banner,
      cover,
      description,
      title,
      nsfw,
      trailerYtId,
    })

    const animeSeasons = seasons.map((season) =>
      Season.create(
        {
          title: season.title,
          createdAt: season.createdAt,
          updatedAt: season.updatedAt,
          animeId: anime.id,
        },
        season.id,
      ),
    )

    const animeGenres = genres.map((genre) =>
      Genre.create(
        {
          title: genre.title,
          animeId: anime.id,
        },
        genre.id,
      ),
    )

    anime.seasons = new SeasonList(animeSeasons)
    anime.genres = new GenreList(animeGenres)

    await this.animesRepository.create(anime)

    return success({ anime })
  }
}
