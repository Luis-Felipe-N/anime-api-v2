import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Slug } from 'src/core/values-objects/slug'
import { Episode } from 'src/domain/enterprise/entities/episode'
import { Prisma, Episode as PrismaEpisode } from '@prisma/client'

export class PrismaEpisodeMapper {
  static toDomain(raw: PrismaEpisode): Episode {
    return Episode.create(
      {
        title: raw.title,
        seasonId: new UniqueEntityId(raw.seasonId),
        cover: raw.cover,
        description: raw.description,
        duration: raw.duration,
        index: raw.index,
        slug: Slug.create(raw.slug),
        createdAt: raw.createdAt,
        type: raw.type,
        video: raw.video,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(raw: Episode): Prisma.EpisodeUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      seasonId: raw.seasonId.toString(),
      title: raw.title,
      cover: raw.cover,
      description: raw.description,
      duration: raw.duration,
      index: raw.index,
      slug: raw.slug.value,
      createdAt: raw.createdAt,
      type: raw.type,
      video: raw.video,
    }
  }

  static toPrismaScrapper(
    raw: Episode,
    seasonId: string,
  ): Prisma.EpisodeUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      seasonId,
      title: raw.title,
      cover: raw.cover,
      description: raw.description,
      duration: raw.duration,
      index: raw.index,
      slug: raw.slug.value,
      createdAt: raw.createdAt,
      type: raw.type,
      video: raw.video,
    }
  }

  static toPrismaMany(raws: Episode[]): Prisma.EpisodeUncheckedCreateInput[] {
    return raws.map((raw) => ({
      seasonId: raw.seasonId.toString(),
      id: raw.id.toString(),
      title: raw.title,
      cover: raw.cover,
      description: raw.description,
      duration: raw.duration,
      index: raw.index,
      slug: raw.slug.value,
      createdAt: raw.createdAt,
      type: raw.type,
      video: raw.video,
    }))
  }

  static toPrismaManyFromScrapper(
    raws: Episode[],
    seasonId: string,
  ): Prisma.EpisodeUncheckedCreateInput[] {
    return raws.map((raw) => ({
      seasonId,
      id: raw.id.toString(),
      title: raw.title,
      cover: raw.cover,
      description: raw.description,
      duration: raw.duration,
      index: raw.index,
      slug: raw.slug.value,
      createdAt: raw.createdAt,
      type: raw.type,
      video: raw.video,
    }))
  }
}
