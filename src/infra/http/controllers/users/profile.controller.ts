import { makeGetUserProfileUseCase } from '@/infra/factories/users/make-get-user-profile-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { UserPresenter } from '../../presenters/user-presenters'
import { BadRequestException } from '@/core/exception/bad-request.exception'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const useCase = makeGetUserProfileUseCase()

  const result = await useCase.execute({
    userId: request.user.sub,
  })

  if (result.isFailure()) {
    throw new BadRequestException()
  }

  return reply.status(200).send({
    user: UserPresenter.toHTTP(result.value.user),
  })
}
