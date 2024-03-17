import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Comment, CommentProps } from '@/domain/enterprise/entities/Comment'
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
