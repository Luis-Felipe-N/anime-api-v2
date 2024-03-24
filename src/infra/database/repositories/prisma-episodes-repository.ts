import { prisma } from '../prisma/prisma'
import { Episode } from '@/domain/enterprise/entities/episode'
import { PaginationParams } from '@/core/types/pagination-params'
import { PrismaEpisodeMapper } from '../mapper/prisma-episode-mapper'
import { EpisodesRepository } from '@/domain/application/repositories/episode.repository'

export class PrismaEpisodesRepository implements EpisodesRepository {
  constructor() {}

  async create(episode: Episode) {
    const data = PrismaEpisodeMapper.toPrisma(episode)
    await prisma.episode.create({
      data,
    })
  }

  async createMany(episodes: Episode[]): Promise<void> {
    const data = PrismaEpisodeMapper.toPrismaMany(episodes)

    await prisma.episode.createMany({
      data,
    })
  }

  async findManyBySeason(seasonId: string, params: PaginationParams) {
    const episodes = await prisma.episode.findMany({
      where: {
        seasonId,
      },
      skip: (params.page - 1) * 20,
      take: 20,
    })

    return episodes.map(PrismaEpisodeMapper.toDomain)
  }

  async findByIndex(seasonId: string, episodeIndex: number) {
    const episode = await prisma.episode.findFirst({
      where: {
        seasonId,
        index: episodeIndex,
      },
    })

    if (!episode) return null

    return PrismaEpisodeMapper.toDomain(episode)
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
    })

    if (!episode) return null

    return PrismaEpisodeMapper.toDomain(episode)
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
