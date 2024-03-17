import { ZodError } from 'zod'
import { env } from './infra/env'

import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import cors from '@fastify/cors'

// import { usersRoutes } from './http/controllers/users/routes'
// import { categoriesRouter } from './http/controllers/categories/routes'
// import { quizzesRoutes } from './http/controllers/quiz/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.SECRET_KEY,
})

app.register(cors, {
  // put your options here
})

app.register(usersRoutes)
// app.register(categoriesRouter)
// app.register(quizzesRoutes)

app.setErrorHandler((error, _, reply) => {
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
