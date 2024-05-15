// import { FastifyRequest, FastifyReply } from 'fastify'
// import { BadRequestException } from '@/core/exception/bad-request.exception'
// import { makeAddAnimeOnWatchlistUseCase } from '@/infra/factories/users/make-add-anime-on-watchlist-use-case'
// import { z } from 'zod'
// import { WatchlistPresenter } from '../../presenters/watchlist-presenters'

// interface FastifyRequestC extends FastifyRequest {
//   user: any
// }

// export async function animeToWatchlist(
//   request: FastifyRequestC,
//   reply: FastifyReply,
// ) {
//   const animeToWatchListBodySchema = z.object({
//     animes: z.array(z.string().uuid()),
//   })

//   const { animes } = animeToWatchListBodySchema.parse(request.body)

//   const useCase = makeAddAnimeOnWatchlistUseCase()

//   const result = await useCase.execute({
//     userId: request.user.sub,
//     animesIds: animes,
//   })

//   if (result.isFailure()) {
//     throw new BadRequestException()
//   }

//   return reply.status(200).send({
//     user: WatchlistPresenter.toHTTP(result.value.watchlist),
//   })
// }
