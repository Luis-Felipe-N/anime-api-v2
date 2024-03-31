import { AnimesRepository } from '@/domain/application/repositories/animes.repository'
import { Anime } from '@/domain/enterprise/entities/anime'
import { Anime as PrismaAnime } from '@prisma/client'

import { prisma } from '../prisma/prisma'
import { PrismaAnimeMapper } from '../mapper/prisma-anime-mapper'
import { SeasonsRepository } from '@/domain/application/repositories/seasons-repository'
import { PaginationParams } from '@/core/types/pagination-params'
import { GenresRepository } from '@/domain/application/repositories/genres.repository'
import { PrismaAnimeDetailsMapper } from '../mapper/prisma-anime-detail-mapper'
import { Normalize } from '@/core/values-objects/normalize'

export class PrismaAnimesRepository implements AnimesRepository {
  constructor(
    private seasonsRepository: SeasonsRepository,
    private genresRepository: GenresRepository,
  ) {}

  async create(anime: Anime) {
    const { id, ...data } = PrismaAnimeMapper.toPrisma(anime)
    await prisma.anime.upsert({
      where: {
        slug: data.slug,
      },
      create: {
        id,
        ...data,
      },
      update: data,
    })

    await this.seasonsRepository.createMany(anime.seasons.getItems())
    await this.genresRepository.createMany(anime.genres.getItems())
  }

  async createFromScrapper(anime: Anime) {
    const { id, ...data } = PrismaAnimeMapper.toPrisma(anime)
    const animePrisma = await prisma.anime.upsert({
      where: {
        slug: data.slug,
      },
      create: {
        id,
        ...data,
      },
      update: data,
    })

    await this.seasonsRepository.createManyFromScrapper(
      anime.seasons.getItems(),
      animePrisma.id,
    )
    await this.genresRepository.createManyFromScrapper(
      anime.genres.getItems(),
      animePrisma.id,
    )
  }

  async save(anime: Anime) {
    const data = PrismaAnimeMapper.toPrisma(anime)

    await prisma.anime.update({
      where: {
        slug: data.slug,
      },
      data,
    })
    await this.seasonsRepository.createMany(anime.seasons.getItems())
    await this.genresRepository.createMany(anime.genres.getItems())
  }

  async findBySlug(slug: string) {
    const anime = await prisma.anime.findUnique({
      where: {
        slug,
      },
      include: {
        seasons: true,
        genres: true,
      },
    })

    if (!anime) return null

    return PrismaAnimeDetailsMapper.toDomain(anime)
  }

  async findById(id: string): Promise<Anime | null> {
    const anime = await prisma.anime.findUnique({
      where: {
        id,
      },
      include: {
        seasons: true,
        genres: true,
      },
    })

    if (!anime) return null

    return PrismaAnimeDetailsMapper.toDomain(anime)
  }

  async findManyByGenre(genreSlug: string, params: PaginationParams) {
    const animes = await prisma.anime.findMany({
      where: {
        genres: {
          some: {
            slug: genreSlug,
          },
        },
      },
      skip: (params.page - 1) * 20,
      take: 20,
    })

    return animes.map(PrismaAnimeMapper.toDomain)
  }

  async delete(anime: Anime) {
    const data = PrismaAnimeMapper.toPrisma(anime)
    await prisma.anime.delete({
      where: {
        id: data.id,
      },
    })
  }

  async findManyByKeyword(
    keyword: string,
    params: PaginationParams,
  ): Promise<Anime[]> {
    await prisma.$queryRaw`
      DROP EXTENSION IF EXISTS unaccent;
    `

    await prisma.$queryRaw`
      CREATE EXTENSION unaccent;
    `

    const animes: PrismaAnime[] = await prisma.$queryRaw`        
        select * from animes 
        where unaccent(title) LIKE ${`%${Normalize.normalizeText(keyword)}%`} 
        offset ${(params.page - 1) * 20}
        limit ${20} ;`

    return animes.map(PrismaAnimeMapper.toDomain)
  }
}
