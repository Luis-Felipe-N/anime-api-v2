import { FastifyReply, FastifyRequest } from 'fastify'
import { AnimePresenter } from '../../presenters/anime-presenters'

import { makeFetchPopularAnimesUseCase } from '@/infra/factories/animes/make-fetch-animes-by-genre-use-case copy'
import { failure } from '@/core/either'

export async function popular(request: FastifyRequest, reply: FastifyReply) {
  const useCase = makeFetchPopularAnimesUseCase()

  const result = await useCase.execute()

  if (result.isFailure()) {
    return failure(new Error())
  }

  return reply
    .status(200)
    .send({ animes: result.value.animes.map(AnimePresenter.toHTTP) })
}
