import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Slug } from '@/core/values-objects/slug'
import { Season } from '@/domain/enterprise/entities/season'
import { Prisma, Season as PrismaSeason } from '@prisma/client'

export class PrismaSeasonMapper {
  static toDomain(raw: PrismaSeason): Season {
    return Season.create(
      {
        title: raw.title,
        animeId: new UniqueEntityId(raw.animeId),
        slug: Slug.create(raw.slug),
        updatedAt: raw.updatedAt,
        createdAt: raw.createdAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(raw: Season): Prisma.SeasonUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      slug: raw.slug.value,
      animeId: raw.animeId.toString(),
      title: raw.title,
      updatedAt: raw.updatedAt,
      createdAt: raw.createdAt,
    }
  }

  static toPrismaMany(raws: Season[]): Prisma.SeasonUncheckedCreateInput[] {
    return raws.map((raw) => ({
      id: raw.id.toString(),
      slug: raw.slug.value,
      animeId: raw.animeId.toString(),
      title: raw.title,
      updatedAt: raw.updatedAt,
      createdAt: raw.createdAt,
    }))
  }

  static toPrismaUpdateMany(seasons: Season[]): Prisma.SeasonUpdateManyArgs {
    const seasonsIds = seasons.map((season) => {
      return season.id.toString()
    })

    return {
      where: {
        id: {
          in: seasonsIds,
        },
      },
      data: {
        animeId: seasons[0].animeId.toString(),
      },
    }
  }
}
