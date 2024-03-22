import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Slug } from '@/core/values-objects/slug'
import { Episode } from '@/domain/enterprise/entities/episode'
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
    }
  }
}
