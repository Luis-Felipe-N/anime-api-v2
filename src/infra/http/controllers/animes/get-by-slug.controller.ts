import { makeGetAnimeBySlugUseCase } from '@/infra/factories/animes/make-get-anime-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { AnimePresenter } from '../../presenters/anime-presenters'

export async function getBySlug(request: FastifyRequest, reply: FastifyReply) {
  const getBySlugParamsSchema = z.object({
    slug: z.string(),
  })

  const { slug } = getBySlugParamsSchema.parse(request.params)

  const useCase = makeGetAnimeBySlugUseCase()

  const result = await useCase.execute({
    slug,
  })

  if (result.isSuccess()) {
    return reply
      .status(200)
      .send({ anime: AnimePresenter.toHTTP(result.value.anime) })
  }
}
