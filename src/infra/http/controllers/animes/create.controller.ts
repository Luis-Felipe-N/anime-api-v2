// import { makeCreateGymsUseCase } from '@/use-case/factories/make-create-gym-use-case'
import { makeCreateAnimeUseCase } from '@/infra/factories/make-create-anime-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string(),
    banner: z.string(),
    cover: z.string(),
  })

  const { title, description, banner, cover } = createGymBodySchema.parse(
    request.body,
  )

  const createGymUseCase = makeCreateAnimeUseCase()
  await createGymUseCase.execute({
    title,
    description,
    banner,
    cover,
  })

  return reply.status(201).send()
}
