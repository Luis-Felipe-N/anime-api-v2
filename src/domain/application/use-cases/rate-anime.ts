import { Episode } from '../../enterprise/entities/episode'
import { AnimesRepository } from '../repositories/animes.repository'
import { Either, failure, success } from '../../../core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { Rating } from '../../../domain/enterprise/entities/rating'
import { UniqueEntityId } from '../../../core/entities/unique-entity-id'
import type { RatingsRepository } from '../repositories/ratings-repository'

interface RateAnimeUseCaseRequest {
  userId: string
  animeId: string
  rating: number
  review?: string
}

type RateAnimeUseCaseResponse = Either<ResourceNotFoundError, { rating: Rating }>

export class RateAnimeUseCase {
  constructor(
    private ratingsRepository: RatingsRepository,
    private animesRepository: AnimesRepository,
  ) {}

  async execute({
    userId,
    animeId,
    rating,
    review,
  }: RateAnimeUseCaseRequest): Promise<RateAnimeUseCaseResponse> {
    const existingRating = await this.ratingsRepository.findByUserIdAndAnimeId(
      userId,
      animeId,
    )

    if (existingRating) {
      existingRating.rating = rating
      existingRating.review = review
      await this.ratingsRepository.save(existingRating)
      
      await this.recalculateAnimeAverageRating(animeId)

      return success({ rating: existingRating })
    }

    const newRating = Rating.create({
      userId: new UniqueEntityId(userId),
      animeId: new UniqueEntityId(animeId),
      rating,
      review,
    })

    await this.ratingsRepository.create(newRating)
    
    await this.recalculateAnimeAverageRating(animeId)

    return success({ rating: newRating })
  }

  private async recalculateAnimeAverageRating(animeId: string): Promise<void> {
    console.log(`Recalculando a nota média para o anime: ${animeId}`)
  }
}