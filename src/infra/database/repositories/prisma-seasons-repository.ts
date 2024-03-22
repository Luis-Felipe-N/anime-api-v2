import { SeasonsRepository } from '@/domain/application/repositories/seasons-repository'
import { PrismaSeasonMapper } from '../mapper/prisma-season-mapper'
import { prisma } from '../prisma/prisma'
import { Season } from '@/domain/enterprise/entities/season'

export class PrismaSeasonsRepository implements SeasonsRepository {
  // constructor(private seasonsRepository: SeasonsRepository) {}

  async create(season: Season) {
    const data = PrismaSeasonMapper.toPrisma(season)
    await prisma.season.create({
      data,
    })
  }

  async createMany(seasons: Season[]) {
    const data = PrismaSeasonMapper.toPrismaMany(seasons)

    await prisma.season.createMany({
      data,
    })
  }

  async findBySlug(slug: string) {
    const season = await prisma.season.findUnique({
      where: {
        slug,
      },
    })

    if (!season) return null

    return PrismaSeasonMapper.toDomain(season)
  }

  async findById(id: string): Promise<Season | null> {
    const season = await prisma.season.findUnique({
      where: {
        id,
      },
    })

    if (!season) return null

    return PrismaSeasonMapper.toDomain(season)
  }

  async delete(season: Season) {
    const data = PrismaSeasonMapper.toPrisma(season)
    await prisma.season.delete({
      where: {
        id: data.id,
      },
    })
  }
}
