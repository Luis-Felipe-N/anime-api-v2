import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { failure } from '../../../../core/either'
import { SeasonPresenter } from '../../presenters/season-presenters'
import { makeGetSeasonByIdUseCase } from '../../../factories/seasons/make-get-season-by-id-use-case'

export async function getById(request: FastifyRequest, reply: FastifyReply) {
  const getByIdParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = getByIdParamsSchema.parse(request.params)

  const useCase = makeGetSeasonByIdUseCase()

  const result = await useCase.execute({
    id,
  })

  if (result.isFailure()) {
    return failure(new Error())
  }

  return reply
    .status(200)
    .send({ season: SeasonPresenter.toHTTP(result.value.season) })
}
