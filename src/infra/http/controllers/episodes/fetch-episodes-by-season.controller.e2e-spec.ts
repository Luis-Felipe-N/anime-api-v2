import { app } from '@/app'
import request from 'supertest'

import { makePrismaAnime } from 'test/factories/make-anime'
import { makePrismaEpisode } from 'test/factories/make-episode'
import { makePrismaSeason } from 'test/factories/make-season'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
// import { createAndAuthenticateUser } from '@/lib/test/create-and-authenticate-user'

describe('Create Anime (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('[GET] /episodes/[:seasonId]', async () => {
    // const { token } = await createAndAuthenticateUser(app)

    const animePrisma = await makePrismaAnime({
      title: 'Jujutsu',
    })

    const seasonPrisma01 = await makePrismaSeason({
      title: 'Temporada 01',
      animeId: animePrisma.id,
    })

    const seasonPrisma02 = await makePrismaSeason({
      title: 'Temporada 02',
      animeId: animePrisma.id,
    })

    await makePrismaEpisode({
      title: 'Episodio 02',
      seasonId: seasonPrisma01.id,
    })

    await makePrismaEpisode({
      title: 'Episodio 02',
      seasonId: seasonPrisma02.id,
    })

    const response = await request(app.server).get(
      `/episodes/season/${seasonPrisma02.id}`,
    )
    console.log(response.body)
    expect(response.statusCode).toEqual(200)

    expect(response.body.episodes[0].title).toBe('Episodio 02')
  })
})
