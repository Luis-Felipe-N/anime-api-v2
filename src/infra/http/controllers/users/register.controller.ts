import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'

import { UserAlreadyExistsError } from '@/use-case/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/use-case/factories/make-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({ name, email, password })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }
  }

  return reply.status(201).send()
}
