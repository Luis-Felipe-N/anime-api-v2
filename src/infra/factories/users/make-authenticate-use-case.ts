import { AuthenticateUseCase } from '../../../domain/application/use-cases/authenticate'
import { PrismaUsersRepository } from '../../database/repositories/prisma-users-repository'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new AuthenticateUseCase(usersRepository)
  return useCase
}
