import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Slug } from '@/core/values-objects/slug'
import { Anime } from '@/domain/enterprise/entities/anime'
import { Anime as PrismaAnime, Season as PrismaSeason } from '@prisma/client'

import { PrismaSeasonMapper } from './prisma-season-mapper'

type PrismaAnimeDetails = PrismaAnime & {
  seasons: PrismaSeason[]
}

export class PrismaAnimeDetailsMapper {
  static toDomain(raw: PrismaAnimeDetails): Anime {
    return Anime.create(
      {
        title: raw.title,
        description: raw.description,
        banner: raw.banner,
        cover: raw.cover,
        nsfw: raw.nsfw,
        authorId: new UniqueEntityId(raw.authorId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        seasons: raw.seasons.map(PrismaSeasonMapper.toDomain),
        trailerYtId: raw.trailerYtId,
        slug: Slug.create(raw.slug),
      },
      new UniqueEntityId(raw.id),
    )
  }
}
