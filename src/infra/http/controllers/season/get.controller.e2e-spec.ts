import { app } from '@/app'
import request from 'supertest'

import { makePrismaAnime } from 'test/factories/make-anime'
import { makePrismaEpisode } from 'test/factories/make-episode'
import { makePrismaSeason } from 'test/factories/make-season'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
// import { createAndAuthenticateUser } from '@/lib/test/create-and-authenticate-user'

describe('Get Season (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('[GET] /seasons/[:id]', async () => {
    // const { token } = await createAndAuthenticateUser(app)

    const animePrisma = await makePrismaAnime({
      title: 'Jujutsu',
    })

    const seasonPrisma = await makePrismaSeason({
      title: 'Temporada 01',
      animeId: animePrisma.id,
    })

    await makePrismaEpisode({
      title: 'Episode 01',
      seasonId: seasonPrisma.id,
    })

    await makePrismaEpisode({
      title: 'Episode 02',
      seasonId: seasonPrisma.id,
    })

    const response = await request(app.server).get(
      `/seasons/${seasonPrisma.id}`,
    )

    expect(response.statusCode).toEqual(200)

    expect(response.body.season.title).toBe('Temporada 01')
    expect(response.body.season.episodes[0].title).toBe('Episode 01')
  })
})
