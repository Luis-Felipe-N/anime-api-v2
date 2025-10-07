import { app } from 'src/app'
import { prisma } from 'src/infra/database/prisma/prisma'
import request from 'supertest'
// import { createAndAuthenticateUser } from 'src/lib/test/create-and-authenticate-user'

describe('Create Anime (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
    await prisma.$disconnect();
  })

  it('[POST] /animes (should be able to create an anime, its seasons, and episodes from a valid slug)', async () => {
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

    expect(animeOnDatabase).toBeTruthy()
    expect(seasonOnDatabase).toBeTruthy()
    expect(episodesOnDatabase.length).toBeGreaterThan(0)
  })
})
