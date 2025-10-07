import { GetUserProfileUseCase } from '../../../domain/application/use-cases/get-user-profile'
import { PrismaUsersRepository } from '../../database/repositories/prisma-users-repository'

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new GetUserProfileUseCase(usersRepository)
  return useCase
}
