import { Either, success } from '@/core/either'
import { AnimesRepository } from '../repositories/animes.repository'
import { Anime } from '@/domain/enterprise/entities/anime'
// import { UsersRepository } from '../repositories/users-repository'

// interface FetchPopularAnimesUseCaseRequest {
//   userId: string
// }

type FetchPopularAnimesUseCaseResponse = Either<null, { animes: Anime[] }>

export class FetchPopularAnimesUseCase {
  constructor(
    private animesRepository: AnimesRepository,
    // private usersRepository: UsersRepository,
  ) {}

  async execute(): Promise<FetchPopularAnimesUseCaseResponse> {
    // const user = await this.usersRepository.findById(userId)

    const animes = await this.animesRepository.findManyPopular()

    return success({ animes })
  }
}
