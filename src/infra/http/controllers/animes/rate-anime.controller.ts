import { FastifyReply, FastifyRequest } from 'fastify'
import { makeRateAnimeUseCase } from 'src/infra/factories/animes/make-rate-anime-use-case'
import { z } from 'zod'

interface FastifyRequestC extends FastifyRequest {
  user: any
}

export async function rateAnimeController(
  request: FastifyRequestC,
  reply: FastifyReply,
) {
  const rateAnimeParamsSchema = z.object({
    animeId: z.string().uuid(),
  })

  const rateAnimeBodySchema = z.object({
    rating: z.number().min(1).max(5),
    review: z.string().optional(),
  })

  const { animeId } = rateAnimeParamsSchema.parse(request.params)
  const { rating, review } = rateAnimeBodySchema.parse(request.body)
  const userId = request.user.sub 

  const rateAnimeUseCase = makeRateAnimeUseCase()

  const result = await rateAnimeUseCase.execute({
    userId,
    animeId,
    rating,
    review,
  })

  if (result.isFailure()) {
    return reply.status(400).send()
  }

  return reply.status(204).send() 
}