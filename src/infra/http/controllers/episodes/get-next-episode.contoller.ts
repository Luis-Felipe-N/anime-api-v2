import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { EpisodePresenter } from '../../presenters/episode-presenters'
import { makeGetNextEpisodeUseCase } from 'src/infra/factories/episodes/make-get-next-episode-use-case'
import { failure } from 'src/core/either'

export async function getNextEpisode(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getNextEpisodeBodySchema = z.object({
    seasonId: z.string(),
    animeId: z.string(),
    currentIndex: z.number(),
  })

  const { seasonId, animeId, currentIndex } = getNextEpisodeBodySchema.parse(
    request.body,
  )

  const useCase = makeGetNextEpisodeUseCase()

  const result = await useCase.execute({
    seasonId,
    animeId,
    currentEpisodeIndex: currentIndex,
  })

  if (result.isFailure()) {
    return failure(new Error())
  }

  return reply
    .status(200)
    .send({ episode: EpisodePresenter.toHTTP(result.value.episode) })
}
