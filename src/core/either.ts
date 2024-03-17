// Error
export class Failure<F> {
  readonly value: F

  constructor(value: F) {
    this.value = value
  }
}

// Success
export class Success<S> {
  readonly value: S

  constructor(value: S) {
    this.value = value
  }
}

export type Either<F, S> = Failure<F> | Success<S>

export const failure = <F, S>(value: F): Either<F, S> => {
  return new Failure(value)
}

export const success = <F, S>(value: S): Either<F, S> => {
  return new Success(value)
}
