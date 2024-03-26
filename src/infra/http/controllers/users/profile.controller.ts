import { FastifyRequest, FastifyReply } from 'fastify'

import { undefined, z } from 'zod'

import { InvalidCredentialsError } from '@/use-case/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-case/factories/make-authenticate-use-case'
import { makeGetUserProfileUseCase } from '@/use-case/factories/make-get-user-profile-use-case'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetUserProfileUseCase()

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  })
}
