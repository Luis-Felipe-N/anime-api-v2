import { FastifyInstance } from 'fastify'
import { verifyJwtMiddleware } from '@/infra/middleware/verify-jwt.middleware'
import { create } from './create.controller'
import { fetchByGenre } from './fetch-by-genre.controller'

export async function animesRouter(app: FastifyInstance) {
  app.post('/animes', create)
  app.get('/animes/genre/:slug', fetchByGenre)
}
