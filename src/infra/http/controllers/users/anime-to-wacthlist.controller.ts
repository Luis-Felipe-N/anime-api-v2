import { FastifyRequest, FastifyReply } from 'fastify'
import { BadRequestException } from '@/core/exception/bad-request.exception'
import { makeAddAnimeOnWatchlistUseCase } from '@/infra/factories/users/make-add-anime-on-watchlist-use-case'
import { z } from 'zod'
import { WatchlistPresenter } from '../../presenters/watchlist-presenters'

export async function animeToWatchlist(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const animeToWatchListBodySchema = z.object({
    animeId: z.string(),
  })

  const { animeId } = animeToWatchListBodySchema.parse(request.body)

  const useCase = makeAddAnimeOnWatchlistUseCase()

  const result = await useCase.execute({
    userId: request.user.sub,
    animeId,
  })

  if (result.isFailure()) {
    throw new BadRequestException()
  }

  return reply.status(200).send({
    user: WatchlistPresenter.toHTTP(result.value.watchlist),
  })
}
