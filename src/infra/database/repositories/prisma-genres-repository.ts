import { GenresRepository } from '@/domain/application/repositories/genres.repository'
import { prisma } from '../prisma/prisma'
import { PrismaGenreMapper } from '../mapper/prisma-genre-mapper'
import { Genre } from '@/domain/enterprise/entities/genre'

export class PrismaGenresRepository implements GenresRepository {
  constructor() {}

  async create(genre: Genre) {
    const data = PrismaGenreMapper.toPrisma(genre)

    await prisma.genre.create({
      data,
    })
  }

  async createFromScrapper(genre: Genre, animeId: string) {
    const { id, ...data } = PrismaGenreMapper.toPrisma(genre)

    await prisma.genre.upsert({
      where: {
        slug: data.slug,
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
  }

  async createMany(genres: Genre[]): Promise<void> {
    genres.map((genre) => this.create(genre))
  }

  async createManyFromScrapper(
    genres: Genre[],
    animeId: string,
  ): Promise<void> {
    genres.map((genre) => this.createFromScrapper(genre, animeId))
  }

  async findBySlug(slug: string) {
    const genre = await prisma.genre.findUnique({
      where: {
        slug,
      },
    })

    if (!genre) return null

    return PrismaGenreMapper.toDomain(genre)
  }

  async findById(id: string): Promise<Genre | null> {
    const genre = await prisma.genre.findUnique({
      where: {
        id,
      },
    })

    if (!genre) return null

    return PrismaGenreMapper.toDomain(genre)
  }

  async delete(genre: Genre) {
    const data = PrismaGenreMapper.toPrisma(genre)
    await prisma.genre.delete({
      where: {
        id: data.id,
      },
    })
  }
}
