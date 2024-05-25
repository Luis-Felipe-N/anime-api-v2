import { FastifyInstance } from 'fastify'

import { verifyJwtMiddleware } from '@/infra/middleware/verify-jwt.middleware'

import { authenticate } from './authenticate.controller'
import { watched } from './watched-episode.controller'
import { profile } from './profile.controller'
import { register } from './register.controller'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /** AUTHENTICATED */
  app.get('/me', { onRequest: [verifyJwtMiddleware] }, profile)
  app.post('/watched', { onRequest: [verifyJwtMiddleware] }, watched)
}
