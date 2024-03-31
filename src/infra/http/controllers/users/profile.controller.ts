import { makeGetUserProfileUseCase } from '@/infra/factories/users/make-get-user-profile-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'

import { undefined, z } from 'zod'

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
