import { FastifyInstance } from 'fastify'
import { create } from './create.controller'
import { fetchByGenre } from './fetch-by-genre.controller'
import { getBySlug } from './get-by-slug.controller'
import { search } from './seach.controller'

export async function animesRouter(app: FastifyInstance) {
  app.post('/animes', create)

  app.get('/animes', search)
  app.get('/animes/:slug', getBySlug)
  app.get('/animes/genre/:slug', fetchByGenre)
}
