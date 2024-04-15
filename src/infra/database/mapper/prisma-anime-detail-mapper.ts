import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Slug } from '@/core/values-objects/slug'
import { Anime } from '@/domain/enterprise/entities/anime'
import {
  Anime as PrismaAnime,
  Season as PrismaSeason,
  Genre as PrismaGenre,
} from '@prisma/client'

import { PrismaSeasonMapper } from './prisma-season-mapper'
import { SeasonList } from '@/domain/enterprise/entities/season-list'
import { GenreList } from '@/domain/enterprise/entities/genre-list'
import { PrismaGenreMapper } from './prisma-genre-mapper'

type PrismaAnimeDetails = PrismaAnime & {
  seasons: PrismaSeason[]
  genres: PrismaGenre[]
}

type PrismaAnimeDetailsWithoutSeasons = PrismaAnime & {
  genres: PrismaGenre[]
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
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        seasons: new SeasonList(raw.seasons.map(PrismaSeasonMapper.toDomain)),
        genres: new GenreList(raw.genres.map(PrismaGenreMapper.toDomain)),
        trailerYtId: raw.trailerYtId,
        slug: Slug.create(raw.slug),
        rating: raw.rating,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toDomainWithoutSeasons(raw: PrismaAnimeDetailsWithoutSeasons): Anime {
    return Anime.create(
      {
        title: raw.title,
        description: raw.description,
        banner: raw.banner,
        cover: raw.cover,
        nsfw: raw.nsfw,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        genres: new GenreList(raw.genres.map(PrismaGenreMapper.toDomain)),
        trailerYtId: raw.trailerYtId,
        slug: Slug.create(raw.slug),
        rating: raw.rating,
      },
      new UniqueEntityId(raw.id),
    )
  }
}

