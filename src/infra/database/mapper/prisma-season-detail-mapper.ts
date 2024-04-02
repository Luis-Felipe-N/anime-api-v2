import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Slug } from '@/core/values-objects/slug'
import { EpisodeList } from '@/domain/enterprise/entities/episode-list'
import { Season } from '@/domain/enterprise/entities/season'
import {
  Anime as PrismaAnime,
  Season as PrismaSeason,
  Episode as PrismaEpisode,
} from '@prisma/client'
import { PrismaEpisodeMapper } from './prisma-episode-mapper'
import { PrismaAnimeMapper } from './prisma-anime-mapper'

type PrismaSeasonDetails = PrismaSeason & {
  episodes: PrismaEpisode[]
  anime: PrismaAnime
}

type PrismaSeasonDetailsWithoutEpisodes = PrismaSeason & {
  anime: PrismaAnime
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
        anime: PrismaAnimeMapper.toDomain(raw.anime),
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toDomainWithoutEpisodes(
    raw: PrismaSeasonDetailsWithoutEpisodes,
  ): Season {
    return Season.create(
      {
        title: raw.title,
        animeId: new UniqueEntityId(raw.animeId),
        slug: Slug.create(raw.slug),
        updatedAt: raw.updatedAt,
        createdAt: raw.createdAt,
        anime: PrismaAnimeMapper.toDomain(raw.anime),
      },
      new UniqueEntityId(raw.id),
    )
  }
}
