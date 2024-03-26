export class UserAlreadyExistsError extends Error {
  constructor() {
    super('User with e-email already exits')
  }
}
