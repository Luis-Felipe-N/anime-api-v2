import { SeasonsRepository } from '@/domain/application/repositories/seasons-repository'
import { PrismaSeasonMapper } from '../mapper/prisma-season-mapper'
import { prisma } from '../prisma/prisma'
import { Season } from '@/domain/enterprise/entities/season'
import { PrismaSeasonDetailsMapper } from '../mapper/prisma-season-detail-mapper'
import { EpisodesRepository } from '@/domain/application/repositories/episode.repository'

export class PrismaSeasonsRepository implements SeasonsRepository {
  constructor(private episodesRepository: EpisodesRepository) { }

  async create(season: Season) {
    const { id, ...data } = PrismaSeasonMapper.toPrisma(season)

    await prisma.season.upsert({
      where: {
        seasonIdentifier: {
          animeId: season.animeId.toString(),
          slug: data.slug,
        },
      },
      create: {
        id,
        ...data,
      },
      update: data,
    })

    this.episodesRepository.createMany(season.episodes.getItems())
  }

  async createFromScrapper(season: Season, animeId: string) {
    const { id, ...data } = PrismaSeasonMapper.toPrisma(season)

    const seasonPrisma = await prisma.season.upsert({
      where: {
        seasonIdentifier: {
          animeId,
          slug: data.slug,
        },
      },
      create: {
        id,
        ...data,
        animeId,
      },
      update: {
        ...data,
        animeId,
      },
    })

    this.episodesRepository.createManyFromScrapper(
      season.episodes.getItems(),
      seasonPrisma.id,
    )
  }

  async save(season: Season) {
    const data = PrismaSeasonMapper.toPrisma(season)

    await prisma.season.updateMany({
      where: {
        slug: data.slug,
      },
      data,
    })
  }

  async createMany(seasons: Season[]) {
    seasons.map((season) => this.create(season))
  }

  async createManyFromScrapper(seasons: Season[], animeId: string) {
    seasons.map((season) => this.createFromScrapper(season, animeId))
  }

  async findBySlug(slug: string) {
    const season = await prisma.season.findFirst({
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
      include: {
        episodes: true, anime: {
          include: {
            genres: true
          }
        }
      },
    })

    if (!season) return null

    return PrismaSeasonDetailsMapper.toDomain(season)
  }

  async findManyByAnime(animeId: string): Promise<Season[]> {
    const seasons = await prisma.season.findMany({
      where: { animeId },
      orderBy: {
        slug: 'asc',
      },
    })

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
