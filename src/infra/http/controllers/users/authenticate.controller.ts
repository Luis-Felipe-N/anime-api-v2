import { BadRequestException } from 'src/core/exception/bad-request.exception'
import { UnauthorizedException } from 'src/core/exception/unauthorized.exception'
import { InvalidCredentialsError } from 'src/domain/application/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from 'src/infra/factories/users/make-authenticate-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  const authenticateUseCase = makeAuthenticateUseCase()

  const result = await authenticateUseCase.execute({ email, password })

  if (result.isFailure()) {
    const error = result.value

    switch (error.constructor) {
      case InvalidCredentialsError:
        throw new UnauthorizedException(error.message)
      default:
        throw new BadRequestException(error.message)
    }
  }

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: result.value.user.id.toString(),
      },
    },
  )
  return reply.status(200).send({
    token,
  })

  // try {

  // } catch (error) {
  //   if (error instanceof InvalidCredentialsError) {
  //     return reply.status(400).send({ message: error.message })
  //   }

  //   throw error
  // }
}
