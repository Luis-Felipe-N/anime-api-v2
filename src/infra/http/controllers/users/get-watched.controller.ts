import { z } from 'zod'
import { failure } from '@/core/either'
import { WatchedEpisodePresenter } from '../../presenters/watched-episode-presenter'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetWatchedByEpisodeUseCase } from '@/infra/factories/episodes/make-get-watched-episode-use-case'

interface FastifyRequestC extends FastifyRequest {
  user: any
}

export async function getWatchedByEpisode(request: FastifyRequestC, reply: FastifyReply) {


  const getWatchedByEpisodeSchema = z.object({
    episodeId: z.string(),
  })

  const { episodeId } = getWatchedByEpisodeSchema.parse(request.params)

  const useCase = makeGetWatchedByEpisodeUseCase()

  const result = await useCase.execute({
    authorId: request.user.sub,
    episodeId
  })

  if (result.isFailure()) {
    return failure(new Error())
  }

  return reply
    .status(200)
    .send({ watched: WatchedEpisodePresenter.toHTTP(result.value.watchedEpisode) })
}
