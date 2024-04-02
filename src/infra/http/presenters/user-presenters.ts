import { User } from '@/domain/enterprise/entities/user'

// export interface UserProps {
//   name: string
//   email: string
//   password_hash: string
//   role: Type

//   // watchedepisodes Watched[]
//   // comments        Comment[]
// }

export class UserPresenter {
  static toHTTP(user: User) {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    }
  }
}
