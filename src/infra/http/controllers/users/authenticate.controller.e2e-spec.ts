import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be to able authenticate', async () => {
    await request(app.server).post('/users').send({
      name: 'Luis Felipe',
      email: 'luiss@gmail.com',
      password: '123456',
      avatar: ''
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'luiss@gmail.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
