import { Rating as PrismaRating } from '@prisma/client'
import { UniqueEntityId } from '../../../core/entities/unique-entity-id'
import { Rating } from '../../../domain/enterprise/entities/rating'

export class PrismaRatingMapper {
  static toDomain(raw: PrismaRating): Rating {
    return Rating.create(
      {
        userId: new UniqueEntityId(raw.userId),
        animeId: new UniqueEntityId(raw.animeId),
        rating: raw.rating,
        review: raw.review,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(rating: Rating) {
    return {
      id: rating.id.toString(),
      userId: rating.userId.toString(),
      animeId: rating.animeId.toString(),
      rating: rating.rating,
      review: rating.review,
      createdAt: rating.createdAt,
      updatedAt: rating.updatedAt,
    }
  }
}