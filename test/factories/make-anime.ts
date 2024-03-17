import { Anime, AnimeProps } from '@/domain/enterprise/entities/Anime'

export function makeAnime(override: Partial<AnimeProps> = {}) {
  const anime = Anime.create({
    title: 'Título do anime',
    description: 'Descrição do anime',
    banner: 'banner-link',
    cover: 'cover-link',
    ...override,
  })

  return anime
}
