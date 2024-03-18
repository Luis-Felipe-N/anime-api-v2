import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJwtMiddleware(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    await request.jwtVerify()
  } catch (error) {
    reply.status(401).send({
      message: 'Unauthorized',
    })
  }
}
