import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be to able register', async () => {
    const response = await request(app.server).post('/users').send({
      email: 'luiss@gmail.com',
      name: 'Luis Felipe',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })
})
