import { FastifyInstance } from 'fastify'
import { fetchSeasonsByAnime } from './fetch-seasons-by-anime.controller'
import { getById } from './get.controller'

export async function seasonsRouter(app: FastifyInstance) {
  // app.post('/seasons')

  app.get('/seasons/:id', getById)
  app.get('/seasons/anime/:animeId', fetchSeasonsByAnime)
}
