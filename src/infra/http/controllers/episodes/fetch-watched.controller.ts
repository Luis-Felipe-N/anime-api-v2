import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { failure } from '@/core/either'
import { makeCommentOnEpisodeUseCase } from '@/infra/factories/episodes/make-comment-on-epside-use-case'
import { CommentPresenter } from '../../presenters/comment-presenters'
import { makeFetchCommentsByEpisodeUseCase } from '@/infra/factories/episodes/make-fetch-comments-episode-use-case'

interface FastifyRequestC extends FastifyRequest {
  user: any
}

export async function fetchWatchedByEpisode(request: FastifyRequestC, reply: FastifyReply) {


  const fetchWatchedByEpisodeParamsSchema = z.object({
    episodeId: z.string(),
  })

  const { episodeId } = fetchWatchedByEpisodeParamsSchema.parse(request.params)

  const useCase = makeFetchWatchedByEpisodeUseCase()

  const result = await useCase.execute({
    episodeId,
    page
  })

  if (result.isFailure()) {
    return failure(new Error())
  }

  return reply
    .status(200)
    .send({ comments: result.value.comments.map(CommentPresenter.toHTTP) })
}
