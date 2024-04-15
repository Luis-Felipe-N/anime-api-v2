import { app } from '@/app'
import request from 'supertest'
import { makePrismaAnime } from 'test/factories/make-anime'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Anime To Watchlist (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be to able add anime on watchlist', async () => {
    await request(app.server).post('/users').send({
      name: 'Luis Felipe',
      email: 'luiss@gmail.com',
      password: '123456',
    })

    const sessionsResponse = await request(app.server).post('/sessions').send({
      email: 'luiss@gmail.com',
      password: '123456',
    })

    const { token } = sessionsResponse.body

    const anime01 = await makePrismaAnime()
    const anime02 = await makePrismaAnime()

    const response = await request(app.server)
      .post('/watchlist')
      .set('Authorization', `Bearer ${token}`)
      .send({
        animes: [anime01.id.toString(), anime02.id.toString()],
      })

    console.log(response)

    expect(response.statusCode).toEqual(200)
    // expect(response.body).toEqual({
    //   token: expect.any(String),
    // })
  })
})
