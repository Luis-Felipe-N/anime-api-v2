import { Anime } from '@/domain/enterprise/entities/anime'

export class AnimePresenter {
  static toHTTP(anime: Anime) {
    return {
      id: anime.id.toString(),
      title: anime.title,
      slug: anime.slug.value,
      description: anime.description,
      banner: anime.banner,
      cover: anime.cover,
      nsfw: anime.nsfw,
      trailerYtId: anime.trailerYtId,
      createdAt: anime.createdAt,
    }
  }
}
