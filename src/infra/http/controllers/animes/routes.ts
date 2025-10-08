import { FastifyInstance } from 'fastify'
import { create } from './create.controller'
import { fetchByGenre } from './fetch-by-genre.controller'
import { getBySlug } from './get-by-slug.controller'
import { search } from './seach.controller'
import { upload } from './upload.controller'
import { popular } from './fetch-popular-animes.controller'
import { verifyJwtMiddleware } from 'src/infra/middleware/verify-jwt.middleware'
import { rateAnimeController } from './rate-anime.controller'

export async function animesRouter(app: FastifyInstance) {
  app.post('/animes', create)
  app.post('/animes/upload', upload)

  app.get('/animes', search)
  app.get('/animes/popular', popular)
  app.get('/animes/:slug', getBySlug)
  app.get('/animes/genre/:slug', fetchByGenre)

  app.post(
    '/animes/:animeId/ratings',
    { onRequest: [verifyJwtMiddleware] },
    rateAnimeController,
  )
}
