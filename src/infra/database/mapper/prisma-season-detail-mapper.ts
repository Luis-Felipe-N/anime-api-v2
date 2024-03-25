import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Slug } from '@/core/values-objects/slug'
import { EpisodeList } from '@/domain/enterprise/entities/episode-list'
import { Season } from '@/domain/enterprise/entities/season'
import {
  Season as PrismaSeason,
  Episode as PrismaEpisode,
} from '@prisma/client'
import { PrismaEpisodeMapper } from './prisma-episode-mapper'

type PrismaSeasonDetails = PrismaSeason & {
  episodes: PrismaEpisode[]
}

export class PrismaSeasonDetailsMapper {
  static toDomain(raw: PrismaSeasonDetails): Season {
    return Season.create(
      {
        title: raw.title,
        animeId: new UniqueEntityId(raw.animeId),
        slug: Slug.create(raw.slug),
        episodes: new EpisodeList(
          raw.episodes.map(PrismaEpisodeMapper.toDomain),
        ),
        updatedAt: raw.updatedAt,
        createdAt: raw.createdAt,
      },
      new UniqueEntityId(raw.id),
    )
  }
}
