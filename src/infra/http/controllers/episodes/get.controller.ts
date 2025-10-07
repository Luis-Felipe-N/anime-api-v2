import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { failure } from 'src/core/either'
import { makeGetEpisodeByIdUseCase } from 'src/infra/factories/episodes/make-get-episode-by-id-use-case'
import { EpisodePresenter } from '../../presenters/episode-presenters'

export async function getById(request: FastifyRequest, reply: FastifyReply) {
  const getByIdParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = getByIdParamsSchema.parse(request.params)

  const useCase = makeGetEpisodeByIdUseCase()

  const result = await useCase.execute({
    id,
  })

  if (result.isFailure()) {
    return failure(new Error())
  }

  return reply
    .status(200)
    .send({ episode: EpisodePresenter.toHTTP(result.value.episode) })
}
