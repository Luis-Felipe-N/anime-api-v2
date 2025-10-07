import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Comment } from 'src/domain/enterprise/entities/comment'
import { Prisma, Comment as PrismaComment } from '@prisma/client'

export class PrismaCommentMapper {
  static toDomain(raw: PrismaComment): Comment {
    return Comment.create(
      {
        content: raw.content,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        authorId: new UniqueEntityId(raw.authorId),
        episodeId: new UniqueEntityId(raw.episodeId),
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(raw: Comment): Prisma.CommentUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      content: raw.content,
      authorId: raw.authorId.toString(),
      episodeId: raw.episodeId.toString(),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    }
  }

  static toPrismaMany(raws: Comment[]): Prisma.CommentUncheckedCreateInput[] {
    return raws.map((raw) => ({
      id: raw.id.toString(),
      content: raw.content,
      authorId: raw.authorId.toString(),
      episodeId: raw.episodeId.toString(),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    }))
  }
}
