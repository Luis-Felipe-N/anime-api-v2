import type { RatingsRepository } from "src/domain/application/repositories/ratings-repository"
import type { Rating } from "src/domain/enterprise/entities/rating"
import { PrismaRatingMapper } from "../mapper/prisma-rating-mapper"
import { prisma } from "../prisma/prisma"


export class PrismaRatingsRepository implements RatingsRepository {

  async findByUserIdAndAnimeId(
    userId: string,
    animeId: string,
  ): Promise<Rating | null> {
    const rating = await prisma.rating.findUnique({
      where: {
        userId_animeId: {
          userId,
          animeId,
        },
      },
    })
    return rating ? PrismaRatingMapper.toDomain(rating) : null
  }

  async create(rating: Rating): Promise<void> {
    const data = PrismaRatingMapper.toPrisma(rating)
    await this.prisma.rating.create({ data })
  }

  async save(rating: Rating): Promise<void> {
    const data = PrismaRatingMapper.toPrisma(rating)
    await this.prisma.rating.update({
      where: { id: data.id },
      data,
    })
  }
  
  async findManyByAnimeId(animeId: string, page: number): Promise<Rating[]> {
    const ratings = await this.prisma.rating.findMany({
        where: { animeId },
        orderBy: { createdAt: 'desc' },
        take: 20,
        skip: (page - 1) * 20,
    })

    return ratings.map(PrismaRatingMapper.toDomain)
  }

  async delete(rating: Rating): Promise<void> {
    const data = PrismaRatingMapper.toPrisma(rating)
    await this.prisma.rating.delete({
        where: { id: data.id }
    })
  }

}