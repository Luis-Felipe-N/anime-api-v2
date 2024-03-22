import { makeFetchAnimesByGenreUseCase } from '@/infra/factories/make-fetch-animes-by-genre-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchByGenre(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchAnimesByGenreBodySchema = z.object({
    genreSlug: z.string(),
    page: z.number().default(0),
  })

  const { genreSlug, page } = fetchAnimesByGenreBodySchema.parse(request.body)

  const useCase = makeFetchAnimesByGenreUseCase()

  const animes = await useCase.execute({ genreSlug, page })

  return reply.status(200).send(animes)
}
