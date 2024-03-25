import { SeasonsRepository } from '@/domain/application/repositories/seasons-repository'
import { PrismaSeasonMapper } from '../mapper/prisma-season-mapper'
import { prisma } from '../prisma/prisma'
import { Season } from '@/domain/enterprise/entities/season'
import { PrismaSeasonDetailsMapper } from '../mapper/prisma-season-detail-mapper'
import { EpisodesRepository } from '@/domain/application/repositories/episode.repository'

export class PrismaSeasonsRepository implements SeasonsRepository {
  constructor(private episodesRepository: EpisodesRepository) {}

  async create(season: Season) {
    const data = PrismaSeasonMapper.toPrisma(season)

    await prisma.season.upsert({
      where: {
        slug: data.slug,
      },
      create: data,
      update: {
        slug: season.slug.value,
        animeId: season.animeId.toString(),
        title: season.title,
        updatedAt: season.updatedAt,
        createdAt: season.createdAt,
      },
    })

    this.episodesRepository.createMany(season.episodes.getItems())
  }

  async save(season: Season) {
    const data = PrismaSeasonMapper.toPrisma(season)

    await prisma.season.update({
      where: {
        slug: data.slug,
      },
      data,
    })
  }

  async createMany(seasons: Season[]) {
    // const data = PrismaSeasonMapper.toPrismaUpdateMany(seasons)
    seasons.map((season) => this.create(season))
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
      include: { episodes: true },
    })

    if (!season) return null

    return PrismaSeasonDetailsMapper.toDomain(season)
  }

  async findManyByAnime(animeId: string): Promise<Season[]> {
    const seasons = await prisma.season.findMany({ where: { animeId } })

    return seasons.map(PrismaSeasonMapper.toDomain)
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
