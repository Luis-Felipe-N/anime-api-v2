import { makeUploadAnimeUseCase } from '@/infra/factories/animes/make-upload-animes-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function upload(request: FastifyRequest, reply: FastifyReply) {
  const useCase = makeUploadAnimeUseCase()

  await useCase.execute()

  return reply.status(201).send()
}
