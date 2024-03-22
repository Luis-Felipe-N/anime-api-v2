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

  it('should be to able to create a gym', async () => {
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

    expect(animeOnDatabase).toBeTruthy()
  })
})
