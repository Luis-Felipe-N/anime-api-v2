import { app } from '@/app'
import { prisma } from '@/infra/database/prisma/prisma'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
// import { createAndAuthenticateUser } from '@/lib/test/create-and-authenticate-user'

describe('Create Anime (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('[POST] /animes', async () => {
    // const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server).post('/animes').send({
      slug: 'castlevania',
    })

    expect(response.statusCode).toEqual(201)

    const animeOnDatabase = await prisma.anime.findFirst({
      where: {
        slug: 'castlevania',
      },
    })

    const seasonOnDatabase = await prisma.season.findFirst({
      where: {
        anime: {
          slug: 'castlevania',
        },
      },
    })

    const episodesOnDatabase = await prisma.episode.findMany({
      where: {
        seasonId: seasonOnDatabase?.id,
      },
    })

    console.log(seasonOnDatabase, episodesOnDatabase)

    expect(animeOnDatabase).toBeTruthy()
    expect(seasonOnDatabase).toBeTruthy()
    expect(episodesOnDatabase.length).toBeGreaterThan(0)
  })
})
