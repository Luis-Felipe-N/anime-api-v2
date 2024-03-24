import { FastifyInstance } from 'fastify'
import { fetchEpisodesBySeason } from './fetch-episodes-by-season.controller'
import { getById } from './get.controller'
import { getNextEpisode } from './get-next-epsisode.contoller'

export async function episodesRouter(app: FastifyInstance) {
  app.post('/episodes/next', getNextEpisode)

  app.get('/episodes/:id', getById)
  app.get('/episodes/season/:seasonId', fetchEpisodesBySeason)
}
