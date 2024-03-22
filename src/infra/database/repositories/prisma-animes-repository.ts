import { AnimesRepository } from '@/domain/application/repositories/animes.repository'
import { Anime } from '@/domain/enterprise/entities/anime'
import { prisma } from '../prisma/prisma'
import { PrismaAnimeMapper } from '../mapper/prisma-anime-mapper'
import { SeasonsRepository } from '@/domain/application/repositories/seasons-repository'
import { PaginationParams } from '@/core/types/pagination-params'
import { GenresRepository } from '@/domain/application/repositories/genres.repository'

export class PrismaAnimesRepository implements AnimesRepository {
  constructor(
    private seasonsRepository: SeasonsRepository,
    private genresRepository: GenresRepository,
  ) {}

  async create(anime: Anime) {
    const data = PrismaAnimeMapper.toPrisma(anime)
    await prisma.anime.create({
      data,
    })

    await this.seasonsRepository.createMany(anime.seasons.getItems())
    await this.genresRepository.createMany(anime.genres.getItems())
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
    })

    if (!anime) return null

    return PrismaAnimeMapper.toDomain(anime)
  }

  async findById(id: string): Promise<Anime | null> {
    const anime = await prisma.anime.findUnique({
      where: {
        id,
      },
    })

    if (!anime) return null

    return PrismaAnimeMapper.toDomain(anime)
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
}
