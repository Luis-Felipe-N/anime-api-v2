import type { RatingsRepository } from 'src/domain/application/repositories/ratings-repository'
import type { Rating } from 'src/domain/enterprise/entities/rating'

export class InMemoryRatingsRepository implements RatingsRepository {
  public items: Rating[] = []

  async create(rating: Rating) {
    this.items.push(rating)
  }

  async save(rating: Rating) {
    console.log(this.items)
    const itemIndex = this.items.findIndex((item) => item.id === rating.id)
    this.items[itemIndex] = rating
  }

  async findByUserIdAndAnimeId(userId: string, animeId: string) {
    const rating = this.items.find(
      (item) =>
        item.userId.toString() === userId &&
        item.animeId.toString() === animeId,
    )

    if (!rating) {
      return null
    }

    return rating
  }

  async findManyByAnimeId(animeId: string, page: number) {
    const ratings = this.items
      .filter((item) => item.animeId.toString() === animeId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return ratings
  }

  async delete(rating: Rating) {
    const itemIndex = this.items.findIndex((item) => item.id === rating.id)
    this.items.splice(itemIndex, 1)
  }
}