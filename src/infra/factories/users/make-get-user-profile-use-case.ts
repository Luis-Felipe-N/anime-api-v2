import { GetUserProfileUseCase } from 'src/domain/application/use-cases/get-user-profile'
import { PrismaUsersRepository } from 'src/infra/database/repositories/prisma-users-repository'

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new GetUserProfileUseCase(usersRepository)
  return useCase
}
