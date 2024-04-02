import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Slug } from '@/core/values-objects/slug'
import { Episode } from '@/domain/enterprise/entities/episode'
import {
  Anime as PrismaAnime,
  Season as PrismaSeason,
  Episode as PrismaEpisode,
} from '@prisma/client'
import { PrismaSeasonDetailsMapper } from './prisma-season-detail-mapper'

type PrismaSeasonDetails = PrismaSeason & {
  anime: PrismaAnime
}

type PrismaEpisodeDetails = PrismaEpisode & {
  season: PrismaSeasonDetails
}

export class PrismaEpisodeDetailsMapper {
  static toDomain(raw: PrismaEpisodeDetails): Episode {
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
        season: PrismaSeasonDetailsMapper.toDomainWithoutEpisodes(raw.season),
      },
      new UniqueEntityId(raw.id),
    )
  }
}
