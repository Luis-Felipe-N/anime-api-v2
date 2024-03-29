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

  it('[GET] /animes/genre/[:slug]', async () => {
    // const { token } = await createAndAuthenticateUser(app)

    const animePrisma = await makePrismaAnime({
      title: 'Jujutsu',
    })

    await makePrismaGenre({
      animeId: animePrisma.id,
      title: 'Ação',
    })

    const response = await request(app.server).get('/animes/genre/acao')

    expect(response.statusCode).toEqual(200)

    expect(response.body.animes[0].title).toBe('Jujutsu')
  })
})
