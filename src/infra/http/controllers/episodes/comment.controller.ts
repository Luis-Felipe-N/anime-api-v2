import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { failure } from 'src/core/either'
import { makeCommentOnEpisodeUseCase } from 'src/infra/factories/episodes/make-comment-on-epside-use-case'
import { CommentPresenter } from '../../presenters/comment-presenters'

interface FastifyRequestC extends FastifyRequest {
  user: any
}

export async function comment(request: FastifyRequestC, reply: FastifyReply) {
  const commentOnEpisodeBodySchema = z.object({
    content: z.string(),
  })

  const commentOnEpisodeParamsSchema = z.object({
    episodeId: z.string(),
  })

  const { content } = commentOnEpisodeBodySchema.parse(request.body)
  const { episodeId } = commentOnEpisodeParamsSchema.parse(request.params)

  const useCase = makeCommentOnEpisodeUseCase()

  const result = await useCase.execute({
    authorId: request.user.sub,
    content,
    episodeId,
  })

  if (result.isFailure()) {
    return failure(new Error())
  }
  return reply
    .status(200)
    .send({ comment: CommentPresenter.toHTTP(result.value.comment) })
}
