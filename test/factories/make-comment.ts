import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Comment, CommentProps } from '@/domain/enterprise/entities/Comment'

export function makeComment(override: Partial<CommentProps> = {}) {
  const comment = Comment.create({
    authorId: new UniqueEntityId(),
    episodeId: new UniqueEntityId(),
    content: 'Conteúdo do comentário',
    ...override,
  })

  return comment
}
