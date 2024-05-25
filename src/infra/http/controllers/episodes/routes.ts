import { FastifyInstance } from 'fastify'
import { fetchEpisodesBySeason } from './fetch-episodes-by-season.controller'
import { getById } from './get.controller'
import { getNextEpisode } from './get-next-episode.contoller'
import { verifyJwtMiddleware } from '@/infra/middleware/verify-jwt.middleware'
import { comment } from './comment.controller'
import { fetchCommentsByEpisode } from './fetch-comment.controller'

export async function episodesRouter(app: FastifyInstance) {
  app.post('/episodes/next', getNextEpisode)

  app.get('/episodes/:id', getById)
  app.get('/episodes/season/:seasonId', fetchEpisodesBySeason)
  app.get(
    '/episodes/:episodeId/comments',
    fetchCommentsByEpisode,
  )

  /** AUTHENTICATED */
  app.post(
    '/episodes/:episodeId/comments',
    { onRequest: [verifyJwtMiddleware] },
    comment,
  )
}
