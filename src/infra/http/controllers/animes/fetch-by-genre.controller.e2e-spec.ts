import { app } from '@/app'
import { prisma } from '@/infra/database/prisma/prisma'
import request from 'supertest'

import { makePrismaAnime } from 'test/factories/make-anime'
import { makePrismaGenre } from 'test/factories/make-genre'

describe('Create Anime (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
    await prisma.$disconnect();
  })

  it('[GET] /animes/genre/[:slug]', async () => {

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
