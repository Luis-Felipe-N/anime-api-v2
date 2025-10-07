import { Comment } from 'src/domain/enterprise/entities/comment'
import { prisma } from '../prisma/prisma'
import { PrismaCommentMapper } from '../mapper/prisma-comment-mapper'
import { CommentsRepository } from 'src/domain/application/repositories/comment.repository'
import { PaginationParams } from 'src/core/types/pagination-params'
import { PrismaCommentDetailsMapper } from '../mapper/prisma-comment-detail-mapper'

export class PrismaCommentsRepository implements CommentsRepository {
  // constructor(private seasonsRepository: SeasonsRepository) {}

  async create(comment: Comment) {
    const data = PrismaCommentMapper.toPrisma(comment)
    const commentPrisma = await prisma.comment.create({
      data,
      include: {
        author: true
      }
    })

    return PrismaCommentDetailsMapper.toDomain(commentPrisma)
  }

  async fetchCommentsByEpisode(episodeId: string, params: PaginationParams) {
    const comments = await prisma.comment.findMany({
      where: {
        episodeId,
      },
      include: {
        author: true
      },
      skip: (params.page - 1) * 20,
      take: 20,
    })

    return comments.map(PrismaCommentDetailsMapper.toDomain)
  }

  async findById(id: string): Promise<Comment | null> {
    const comment = await prisma.comment.findUnique({
      where: {
        id,
      },
      include: {
        author: true
      },
    })

    if (!comment) return null

    return PrismaCommentDetailsMapper.toDomain(comment)
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
