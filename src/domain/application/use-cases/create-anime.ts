import { Either, success } from '@/core/either'
import { Optional } from '@/core/types/optional'
import { AnimesRepository } from '@/domain/application/repositories/animes.repository'
import { Anime } from '@/domain/enterprise/entities/anime'
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
