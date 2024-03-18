import { verifyJwtMiddleware } from '@/infra/middleware/verify-jwt.middleware'
import { create } from './create.controller'
import { FastifyInstance } from 'fastify'

export async function animesRouter(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwtMiddleware)

  app.post('/anime/', create)
}
