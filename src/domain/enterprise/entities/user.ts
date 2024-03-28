import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Entity } from '@/core/entities/entity'

export const Type: {
  ADMIN: 'ADMIN'
  USER: 'USER'
} = {
  ADMIN: 'ADMIN',
  USER: 'USER',
}

export type Type = (typeof Type)[keyof typeof Type]

export interface UserProps {
  name: string
  email: string
  password_hash: string
  role: Type

  // watchedepisodes Watched[]
  // comments        Comment[]
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password_hash() {
    return this.props.password_hash
  }

  get role() {
    return this.props.role
  }

  set password_hash(password_hash: string) {
    this.props.password_hash = password_hash
  }

  static create(props: UserProps, id?: UniqueEntityId) {
    const user = new User(
      {
        ...props,
      },
      id,
    )

    return user
  }
}
