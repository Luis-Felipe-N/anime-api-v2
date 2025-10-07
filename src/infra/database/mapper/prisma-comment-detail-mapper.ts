import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Comment } from 'src/domain/enterprise/entities/comment'
import { Prisma, Comment as PrismaComment, User as PrimaUser } from '@prisma/client'
import { PrismaUserMapper } from './prisma-user-mapper'

type PrismaCommentDetails = PrismaComment & {
  author: PrimaUser | null
}

export class PrismaCommentDetailsMapper {
  static toDomain(raw: PrismaCommentDetails): Comment {
    return Comment.create(
      {
        content: raw.content,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        author: raw.author ? PrismaUserMapper.toDomain(raw.author) : null,
        authorId: new UniqueEntityId(raw.authorId),
        episodeId: new UniqueEntityId(raw.episodeId),
      },
      new UniqueEntityId(raw.id),
    )
  }
}
