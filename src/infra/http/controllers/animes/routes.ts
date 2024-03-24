import { FastifyInstance } from 'fastify'
import { verifyJwtMiddleware } from '@/infra/middleware/verify-jwt.middleware'
import { create } from './create.controller'
import { fetchByGenre } from './fetch-by-genre.controller'
import { getBySlug } from './get-by-slug.controller'

export async function animesRouter(app: FastifyInstance) {
  app.post('/animes', create)

  app.get('/animes/:slug', getBySlug)
  app.get('/animes/genre/:slug', fetchByGenre)
}
