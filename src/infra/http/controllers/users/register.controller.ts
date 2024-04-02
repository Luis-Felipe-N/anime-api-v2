import { BadRequestException } from '@/core/exception/bad-request.exception'
import { ConflictException } from '@/core/exception/conflict.exception'
import { UserAlreadyExistsError } from '@/domain/application/use-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/infra/factories/users/make-register-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  const useCase = makeRegisterUseCase()

  const result = await useCase.execute({ name, email, password })

  if (result.isFailure()) {
    const error = result.value

    switch (error.constructor) {
      case UserAlreadyExistsError:
        throw new ConflictException(error.message)
      default:
        throw new BadRequestException(error.message)
    }
  }

  return reply.status(201).send()
}
