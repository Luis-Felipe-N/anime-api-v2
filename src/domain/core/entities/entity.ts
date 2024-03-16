import { randomUUID } from 'crypto'

export class Entity<T> {
  private _id: string
  protected props: T

  get id() {
    return this._id
  }

  constructor(props: T, id?: string) {
    this._id = id ?? randomUUID()
    this.props = props
  }
}
