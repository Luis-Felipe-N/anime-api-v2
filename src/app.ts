import { ZodError } from 'zod'
import { env } from './infra/env'

import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import cors from '@fastify/cors'

// import { usersRoutes } from './http/controllers/users/routes'
import { animesRouter } from './infra/http/controllers/animes/routes'
import { seasonsRouter } from './infra/http/controllers/season/routes'
import { episodesRouter } from './infra/http/controllers/episodes/routes'
import { usersRoutes } from './infra/http/controllers/users/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.SECRET_KEY,
})

app.register(cors, {
  origin: "*",
  // credentials: true
})

app.register(usersRoutes)
app.register(animesRouter)
app.register(seasonsRouter)
app.register(episodesRouter)

app.setErrorHandler((error, _, reply) => {
  try {
    return reply
      .status(error.message.statusCode)
      .send({ message: error.message.error })
  } catch (error) { }
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation Error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'prod') {
    console.error(error)
  } else {
    // Mandar o error para algum serviço de tratamento
  }

  return reply.status(500).send({ message: 'Internal server error' })
})
