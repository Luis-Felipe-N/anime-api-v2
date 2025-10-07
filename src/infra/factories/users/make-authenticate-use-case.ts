import { AuthenticateUseCase } from 'src/domain/application/use-cases/authenticate'
import { PrismaUsersRepository } from 'src/infra/database/repositories/prisma-users-repository'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new AuthenticateUseCase(usersRepository)
  return useCase
}
