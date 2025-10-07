import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'

import { makeFetchSeasonsByAnimeUseCase } from 'src/infra/factories/seasons/make-fetch-seasons-by-anime-use-case'
import { SeasonPresenter } from '../../presenters/season-presenters'

export async function fetchSeasonsByAnime(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchSeasonsByAnimeParamsSchema = z.object({
    animeId: z.string(),
  })

  const { animeId } = fetchSeasonsByAnimeParamsSchema.parse(request.params)

  const useCase = makeFetchSeasonsByAnimeUseCase()

  const result = await useCase.execute({
    animeId,
  })

  if (result.isSuccess()) {
    return reply
      .status(200)
      .send({ seasons: result.value.seasons.map(SeasonPresenter.toHTTP) })
  }
}
