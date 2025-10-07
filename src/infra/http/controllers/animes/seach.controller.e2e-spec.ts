
import { app } from 'src/app'

import request from 'supertest'

import { makePrismaAnime } from 'test/factories/make-anime'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
// import { createAndAuthenticateUser } from 'src/lib/test/create-and-authenticate-user'

describe('Create Anime (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[GET] /animes/ with paginator', async () => {
    // const { token } = await createAndAuthenticateUser(app)

    for (let index = 1; index <= 20; index++) {
      await makePrismaAnime({
        title: `Anime ação ${index}`,
      })
    }

    await makePrismaAnime({
      title: `Anime ação 21`,
    })

    const response = await request(app.server).get('/animes').query({
      keyword: 'acão',
      page: 2,
    })

    expect(response.statusCode).toEqual(200)

    expect(response.body.animes[0].title).toBe('Anime ação 21')
  })

  test('[GET] /animes/', async () => {
    // const { token } = await createAndAuthenticateUser(app)

    await makePrismaAnime({
      title: 'Anime de ação',
    })

    const response = await request(app.server).get('/animes').query({
      keyword: 'acão',
    })

    expect(response.statusCode).toEqual(200)

    expect(response.body.animes[0].title).toBe('Anime ação 1')
  })
})
