import { makeUploadAnimeUseCase } from '@/infra/factories/animes/make-upload-animes-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function upload(request: FastifyRequest, reply: FastifyReply) {
  const uploadAnimesBodySchema = z.object({
    page: z
      .string()
      .transform((state) => Number(state))
      .default('1'),
  })

  const { page } = uploadAnimesBodySchema.parse(request.body)

  const useCase = makeUploadAnimeUseCase()

  await useCase.execute({ page })

  return reply.status(201).send()
}
