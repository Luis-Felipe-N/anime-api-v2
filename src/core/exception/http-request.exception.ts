export class HttpException extends Error {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public readonly message: any

  constructor(
    private readonly response: string | object,
    private readonly status: number,
  ) {
    super()
    this.message = response
  }

  public getResponse(): string | object {
    return this.response
  }

  public getStatus(): number {
    return this.status
  }
}
