import { RegisterUseCase } from '@/domain/application/use-cases/register'
import { PrismaUsersRepository } from '@/infra/database/repositories/prisma-users-repository'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new RegisterUseCase(usersRepository)
  return useCase
}
