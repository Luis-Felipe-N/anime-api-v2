import { Comment } from '@/domain/enterprise/entities/comment'
import { prisma } from '../prisma/prisma'
import { SeasonsRepository } from '@/domain/application/repositories/seasons-repository'
import { PrismaCommentMapper } from '../mapper/prisma-comment-mapper'
import {
  CommentsRepository,
  FetchCommentsByEpisodeProps,
} from '@/domain/application/repositories/comment.repository'

export class PrismaCommentsRepository implements CommentsRepository {
  constructor(private seasonsRepository: SeasonsRepository) {}

  async create(comment: Comment) {
    const data = PrismaCommentMapper.toPrisma(comment)
    await prisma.comment.create({
      data,
    })
  }

  async fetchCommentsByEpisode({
    episodeId,
    params,
  }: FetchCommentsByEpisodeProps) {
    const comments = await prisma.comment.findMany({
      where: {
        episodeId,
      },
      skip: (params.page - 1) * 20,
      take: 20,
    })

    return comments.map(PrismaCommentMapper.toDomain)
  }

  async findById(id: string): Promise<Comment | null> {
    const comment = await prisma.comment.findUnique({
      where: {
        id,
      },
    })

    if (!comment) return null

    return PrismaCommentMapper.toDomain(comment)
  }

  async delete(comment: Comment) {
    const data = PrismaCommentMapper.toPrisma(comment)
    await prisma.comment.delete({
      where: {
        id: data.id,
      },
    })
  }
}
