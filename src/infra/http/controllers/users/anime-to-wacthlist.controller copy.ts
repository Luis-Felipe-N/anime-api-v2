import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { BadRequestException } from '@/core/exception/bad-request.exception'
import { makeAnimeOnWatchlistUseCase } from '@/infra/factories/animes/make-anime-on-watchlist-use-case'
import { WatchlistPresenter } from '../../presenters/watchlist-presenters'

interface FastifyRequestC extends FastifyRequest {
    user: any
}

export async function animeToWatchlist(
    request: FastifyRequestC,
    reply: FastifyReply,
) {
    const animeToWatchListBodySchema = z.object({
        animes: z.array(z.string().uuid()),
    })

    const { animes } = animeToWatchListBodySchema.parse(request.body)

    const useCase = makeAnimeOnWatchlistUseCase()

    const result = await useCase.execute({
        userId: request.user.sub,
        animesIds: animes,
    })

    if (result.isFailure()) {
        throw new BadRequestException()
    }

    return reply.status(200).send({
        user: WatchlistPresenter.toHTTP(result.value.watchlist),
    })
}
