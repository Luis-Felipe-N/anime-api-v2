import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { AnimePresenter } from '../../presenters/anime-presenters'
import { makeFetchAnimesByGenreUseCase } from 'src/infra/factories/animes/make-fetch-animes-by-genre-use-case'

export async function fetchByGenre(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchAnimesByGenreParamsSchema = z.object({
    slug: z.string(),
  })

  const fetchAnimesByGenreQuerySchema = z.object({
    page: z
      .string()
      .transform((state) => Number(state))
      .default('1'),
  })

  const { slug } = fetchAnimesByGenreParamsSchema.parse(request.params)
  const { page } = fetchAnimesByGenreQuerySchema.parse(request.query)

  const useCase = makeFetchAnimesByGenreUseCase()

  const result = await useCase.execute({ genreSlug: slug, page })

  if (result.isSuccess()) {
    return reply
      .status(200)
      .send({ animes: result.value.animes.map(AnimePresenter.toHTTP) })
  }
}
