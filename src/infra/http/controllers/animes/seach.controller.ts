import { failure } from 'src/core/either'
import { makeSearchAnimeUseCase } from 'src/infra/factories/animes/make-search-anime-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { AnimePresenter } from '../../presenters/anime-presenters'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchAnimeQuerySchema = z.object({
    keyword: z.string(),
    page: z
      .string()
      .transform((state) => Number(state))
      .default('1'),
  })

  const { keyword, page } = searchAnimeQuerySchema.parse(request.query)

  const useCase = makeSearchAnimeUseCase()

  const result = await useCase.execute({
    keyword,
    page,
  })

  if (result.isFailure()) {
    return failure(new Error(''))
  }

  return reply.status(200).send({
    animes: result.value.animes.map(AnimePresenter.toHTTP),
  })
}
