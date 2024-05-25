import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Comment, CommentProps } from '@/domain/enterprise/entities/comment'
import { PrismaCommentMapper } from '@/infra/database/mapper/prisma-comment-mapper'
import { prisma } from '@/infra/database/prisma/prisma'
import { faker } from '@faker-js/faker'

export function makeComment(
  override: Partial<CommentProps> = {},
  id?: UniqueEntityId,
) {
  const comment = Comment.create(
    {
      authorId: new UniqueEntityId(),
      episodeId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return comment
}

export async function makePrismaComment(
  data: Partial<CommentProps> = {},
): Promise<Comment> {
  const comment = makeComment(data)

  await prisma.comment.create({ data: PrismaCommentMapper.toPrisma(comment) })

  return comment
}