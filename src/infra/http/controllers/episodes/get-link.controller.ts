import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { failure } from '../../../../core/either'
import { EpisodePresenter } from '../../presenters/episode-presenters'
import { makeGetEpisodeLinkByIdUseCase } from '../../../factories/episodes/make-get-episode-link-by-id-use-case'

export async function getLinkById(request: FastifyRequest, reply: FastifyReply) {
  const getByIdParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = getByIdParamsSchema.parse(request.params)

  const useCase = makeGetEpisodeLinkByIdUseCase()

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
