import { FastifyInstance } from 'fastify'
import { verifyJwtMiddleware } from '@/infra/middleware/verify-jwt.middleware'
import { fetchEpisodesBySeason } from './fetch-episodes-by-season.controller'

export async function episodesRouter(app: FastifyInstance) {
  app.get('/episodes/season/:seasonId', fetchEpisodesBySeason)
  // app.post('/episodes', create)

  // app.get('/episodes/genre/:slug', fetchByGenre)
}
