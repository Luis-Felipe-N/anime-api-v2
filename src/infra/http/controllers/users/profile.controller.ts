// @ts-ignore
import { makeGetUserProfileUseCase } from '../../../factories/users/make-get-user-profile-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { UserPresenter } from '../../presenters/user-presenters'
import { BadRequestException } from '../../../../core/exception/bad-request.exception'

interface FastifyRequestC extends FastifyRequest {
  user: any
}

export async function profile(request: FastifyRequestC, reply: FastifyReply) {
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
