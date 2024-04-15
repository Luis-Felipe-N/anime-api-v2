import { prisma } from '../prisma/prisma'
import { Episode } from '@/domain/enterprise/entities/episode'
import { PaginationParams } from '@/core/types/pagination-params'
import { PrismaEpisodeMapper } from '../mapper/prisma-episode-mapper'
import { EpisodesRepository } from '@/domain/application/repositories/episode.repository'
import { PrismaEpisodeDetailsMapper } from '../mapper/prisma-episode-detail-mapper'

export class PrismaEpisodesRepository implements EpisodesRepository {
  constructor() { }

  async create(episode: Episode) {
    const data = PrismaEpisodeMapper.toPrisma(episode)
    await prisma.episode.create({
      data,
    })
  }

  async createFromScrapper(episode: Episode, seasonId: string): Promise<void> {
    const { id, ...data } = PrismaEpisodeMapper.toPrismaScrapper(
      episode,
      seasonId,
    )
    await prisma.episode.upsert({
      where: {
        slug: data.slug,
      },
      create: {
        id,
        ...data,
      },
      update: {
        ...data,
      },
    })
  }

  async createMany(episodes: Episode[]): Promise<void> {
    const data = PrismaEpisodeMapper.toPrismaMany(episodes)

    await prisma.episode.createMany({
      data,
    })
  }

  async createManyFromScrapper(
    episodes: Episode[],
    seasonId: string,
  ): Promise<void> {
    episodes.map((episode) => this.createFromScrapper(episode, seasonId))
  }

  async findManyBySeason(seasonId: string, params: PaginationParams) {
    const episodes = await prisma.episode.findMany({
      where: {
        seasonId,
      },
      include: {
        season: {
          include: {
            anime: {
              include: { genres: true }
            }
          },
        },
      },
      orderBy: {
        index: 'asc',
      },
      skip: (params.page - 1) * 20,
      take: 20,
    })

    return episodes.map(PrismaEpisodeDetailsMapper.toDomain)
  }

  async findByIndex(seasonId: string, episodeIndex: number) {
    const episode = await prisma.episode.findFirst({
      where: {
        seasonId,
        index: episodeIndex,
      },
      include: {
        season: {
          include: {
            anime: {
              include: { genres: true }
            }
          },
        },
      },
    })

    if (!episode) return null

    return PrismaEpisodeDetailsMapper.toDomain(episode)
  }

  async findBySlug(slug: string) {
    const episode = await prisma.episode.findFirst({
      where: {
        slug,
      },
    })

    if (!episode) return null

    return PrismaEpisodeMapper.toDomain(episode)
  }

  async findById(id: string): Promise<Episode | null> {
    const episode = await prisma.episode.findUnique({
      where: {
        id,
      },
      include: {
        season: {
          include: {
            anime: {
              include: { genres: true }
            }
          },
        },
      },
    })

    if (!episode) return null

    return PrismaEpisodeDetailsMapper.toDomain(episode)
  }

  async delete(episode: Episode) {
    const data = PrismaEpisodeMapper.toPrisma(episode)
    await prisma.episode.delete({
      where: {
        id: data.id,
      },
    })
  }
}
