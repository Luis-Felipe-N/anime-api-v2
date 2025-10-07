import { AnimeProps } from 'src/core/scrapper/animes-online'
import { Anime } from 'src/domain/enterprise/entities/anime'

export function makeAnimeUseCase(data: AnimeProps) {
  const anime = Anime.create({
    banner: data.banner,
    cover: data.cover,
    description: data.description ?? '',
    nsfw: data.nsfw,
    title: data.title,
    trailerYtId: data.trailerYtId,
    rating: data.rating,
  })

  return anime
}
