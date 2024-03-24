import { app } from '@/app'
import request from 'supertest'

import { makePrismaAnime } from 'test/factories/make-anime'
import { makePrismaGenre } from 'test/factories/make-genre'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
// import { createAndAuthenticateUser } from '@/lib/test/create-and-authenticate-user'

describe('Create Anime (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('[GET] /animes/[:slug]', async () => {
    // const { token } = await createAndAuthenticateUser(app)

    await makePrismaAnime({
      title: 'Jujutsu',
    })

    const response = await request(app.server).get('/animes/jujutsu')

    expect(response.statusCode).toEqual(200)

    expect(response.body.anime.title).toBe('Jujutsu')
  })
})
