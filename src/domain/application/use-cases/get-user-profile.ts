import { User } from '@/domain/enterprise/entities/user'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { Either, failure, success } from '@/core/either'
import { UsersRepository } from '../repositories/users-repository'

interface GetUserProfileUseCaseRequest {
  userId: string
}

type GetUserProfileUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    user: User
  }
>

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)
    console.log(user)
    if (!user) {
      return failure(new ResourceNotFoundError())
    }

    return success({ user })
  }
}
