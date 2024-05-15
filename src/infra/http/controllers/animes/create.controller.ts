import { makeUploadAnimeBySlugUseCase } from '@/infra/factories/animes/make-upload-anime-by-slug-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createAnimeBodySchema = z.object({
    slug: z.string(),
  })

  const { slug } = createAnimeBodySchema.parse(request.body)

  console.log('UPDATE: ', slug)

  const useCase = makeUploadAnimeBySlugUseCase()

  await useCase.execute({ slug })

  return reply.status(201).send()
}
