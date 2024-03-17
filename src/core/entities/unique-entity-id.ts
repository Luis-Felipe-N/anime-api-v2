import { randomUUID } from 'crypto'

export class UniqueEntityId {
  private value: string

  toString() {
    return this.value
  }

  toString() {
    return this.value
  }

  constructor(value?: string) {
    this.value = value ?? randomUUID()
  }
}
