import { failure } from '@/core/either'

import { makeCreateWatchedEpisodeUseCase } from '@/infra/factories/users/make-watched-episode-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'
import { WatchedEpisodePresenter } from '../../presenters/watched-episode-presenter'

interface FastifyRequestC extends FastifyRequest {
    user: any
}

export async function watched(
    request: FastifyRequestC,
    reply: FastifyReply,
) {
    const watchedBodySchema = z.object({
        episodeId: z.string(),
        duration: z.number(),
    })

    const { episodeId, duration } = watchedBodySchema.parse(request.body)

    const usecase = makeCreateWatchedEpisodeUseCase()

    const result = await usecase.execute({ authorId: request.user.sub, episodeId, duration })

    if (result.isFailure()) {
        return failure(new Error(''))
    }

    return reply.status(200).send({
        watchedEpisode: WatchedEpisodePresenter.toHTTP(result.value.watchedEpisode),
    })

}
