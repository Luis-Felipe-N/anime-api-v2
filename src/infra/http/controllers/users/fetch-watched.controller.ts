import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { failure } from '@/core/either'
import { makeCommentOnEpisodeUseCase } from '@/infra/factories/episodes/make-comment-on-epside-use-case'
import { CommentPresenter } from '../../presenters/comment-presenters'
import { makeFetchCommentsByEpisodeUseCase } from '@/infra/factories/episodes/make-fetch-comments-episode-use-case'
import { makeFetchWatchedByEpisodeUseCase } from '@/infra/factories/episodes/make-fetch-watched-episode-use-case copy'
import { WatchedEpisodePresenter } from '../../presenters/watched-episode-presenter'

interface FastifyRequestC extends FastifyRequest {
  user: any
}

export async function fetchWatchedByEpisode(request: FastifyRequestC, reply: FastifyReply) {


  const fetchWatchedByEpisodeSchema = z.object({
    episodeId: z.string(),
  })

  const { episodeId } = fetchWatchedByEpisodeSchema.parse(request.params)

  const useCase = makeFetchWatchedByEpisodeUseCase()

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
