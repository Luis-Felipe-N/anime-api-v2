import { FastifyInstance } from 'fastify'

import { register } from './register.controller'
import { authenticate } from './authenticate.controller'
import { profile } from './profile.controller'

import { verifyJwtMiddleware } from '@/middleware/verify-jwt.middleware'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /** AUTHENTICATED */
  app.get('/me', { onRequest: [verifyJwtMiddleware] }, profile)
}
