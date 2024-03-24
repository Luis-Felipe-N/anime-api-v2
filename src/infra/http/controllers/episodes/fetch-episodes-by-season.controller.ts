import { makeFetchEpisodeBySeasonUseCase } from '@/infra/factories/episodes/make-fetch-episode-by-season-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { EpisodePresenter } from '../../presenters/episode-presenters'

export async function fetchEpisodesBySeason(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchEpisodesBySeasonParamsSchema = z.object({
    seasonId: z.string(),
  })

  const fetchEpisodesBySeasonQueryShema = z.object({
    page: z.number().default(1),
  })

  const { seasonId } = fetchEpisodesBySeasonParamsSchema.parse(request.params)

  const { page } = fetchEpisodesBySeasonQueryShema.parse(request.query)

  const useCase = makeFetchEpisodeBySeasonUseCase()

  const result = await useCase.execute({
    seasonId,
    page,
  })

  if (result.isSuccess()) {
    return reply
      .status(200)
      .send({ episodes: result.value.episodes.map(EpisodePresenter.toHTTP) })
  }
}
