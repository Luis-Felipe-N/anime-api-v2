import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { failure } from '@/core/either'
import { makeCommentOnEpisodeUseCase } from '@/infra/factories/episodes/make-comment-on-epside-use-case'
import { CommentPresenter } from '../../presenters/comment-presenters'
import { makeFetchCommentsByEpisodeUseCase } from '@/infra/factories/episodes/make-fetch-comments-episode-use-case'

interface FastifyRequestC extends FastifyRequest {
  user: any
}

export async function fetchCommentsByEpisode(request: FastifyRequestC, reply: FastifyReply) {
  const fetchCommentsByEpisodeQuerySchema = z.object({
    page: z
      .string()
      .transform((state) => Number(state))
      .default('1'),
  })

  const fetchCommentsByEpisodeParamsSchema = z.object({
    episodeId: z.string(),
  })

  const { page } = fetchCommentsByEpisodeQuerySchema.parse(request.query)
  const { episodeId } = fetchCommentsByEpisodeParamsSchema.parse(request.params)

  const useCase = makeFetchCommentsByEpisodeUseCase()

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
