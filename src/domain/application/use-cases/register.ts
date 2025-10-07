import { UserAlreadyExistsError } from './errors/user-already-exists-error'

import { hash } from 'bcryptjs'
import { Either, failure, success } from 'src/core/either'
import { User } from 'src/domain/enterprise/entities/user'
import { UsersRepository } from '../repositories/users-repository'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  avatar: string
}

type RegisterUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    user: User
  }
>

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute({
    name,
    email,
    password,
    avatar
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const UserAlreadyExistsErrorSameEmail =
      await this.usersRepository.findByEmail(email)

    if (UserAlreadyExistsErrorSameEmail) {
      return failure(new UserAlreadyExistsError())
    }

    const user = User.create({
      role: 'USER',
      avatar,
      name,
      email,
      password_hash,
    })

    const userCreated = await this.usersRepository.create(user)

    return success({
      user: userCreated,
    })
  }
}
