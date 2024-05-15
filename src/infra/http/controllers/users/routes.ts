import { FastifyInstance } from 'fastify'

import { register } from './register.controller'
import { authenticate } from './authenticate.controller'
import { profile } from './profile.controller'
import { verifyJwtMiddleware } from '@/infra/middleware/verify-jwt.middleware'
// import { animeToWatchlist } from './anime-to-wacthlist.controller'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /** AUTHENTICATED */
  app.get('/me', { onRequest: [verifyJwtMiddleware] }, profile)
  // app.post('/watchlist', { onRequest: [verifyJwtMiddleware] }, animeToWatchlist)
}
