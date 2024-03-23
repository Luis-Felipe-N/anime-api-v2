import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Slug } from '@/core/values-objects/slug'
import { Anime } from '@/domain/enterprise/entities/anime'
import { Prisma, Anime as PrismaAnime } from '@prisma/client'

export class PrismaAnimeMapper {
  static toDomain(raw: PrismaAnime): Anime {
    return Anime.create(
      {
        title: raw.title,
        description: raw.description,
        banner: raw.banner,
        cover: raw.cover,
        nsfw: raw.nsfw,
        trailerYtId: raw.trailerYtId,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        slug: Slug.create(raw.slug),
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(raw: Anime): Prisma.AnimeUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      slug: raw.slug.value,
      title: raw.title,
      description: raw.description,
      banner: raw.banner,
      cover: raw.cover,
      nsfw: raw.nsfw,
      createdAt: raw.createdAt,
    }
  }
}
