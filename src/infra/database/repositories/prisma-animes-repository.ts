import { AnimesRepository } from '@/domain/application/repositories/animes.repository'
import { Anime } from '@/domain/enterprise/entities/anime'
import { prisma } from '../prisma/prisma'
import { PrismaAnimeMapper } from '../mapper/prisma-anime-mapper'
import { SeasonsRepository } from '@/domain/application/repositories/seasons-repository'

export class PrismaAnimesRepository implements AnimesRepository {
  constructor(private seasonsRepository: SeasonsRepository) {}

  async create(anime: Anime) {
    const data = PrismaAnimeMapper.toPrisma(anime)
    await prisma.anime.create({
      data,
    })

    await this.seasonsRepository.createMany(anime.seasons.getItems())
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

  async delete(anime: Anime) {
    const data = PrismaAnimeMapper.toPrisma(anime)
    await prisma.anime.delete({
      where: {
        id: data.id,
      },
    })
  }
}
