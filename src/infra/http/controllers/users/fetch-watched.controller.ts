import { FastifyReply, FastifyRequest } from 'fastify'
import { failure } from '../../../../core/either'

import { WatchedEpisodePresenter } from '../../presenters/watched-episode-presenter'
import { makeFetchWatchedEpisodesUseCase } from '../../../factories/episodes/make-fetch-watched-episode-use-case'


interface FastifyRequestC extends FastifyRequest {
  user: any
}

export async function fetchWatchedEpisodes(request: FastifyRequestC, reply: FastifyReply) {

  const useCase = makeFetchWatchedEpisodesUseCase()

  const result = await useCase.execute({
    authorId: request.user.sub,
  })

  console.log(result)

  if (result.isFailure()) {
    return failure(new Error())
  }

  return reply
    .status(200)
    .send({ watchedEpisodes: result.value.watchedEpisodes.map(WatchedEpisodePresenter.toHTTP) })
}
