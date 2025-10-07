import { app } from 'src/app'
import { Slug } from 'src/core/values-objects/slug'
import request from 'supertest'

import { makePrismaAnime } from 'test/factories/make-anime'
import { makePrismaEpisode } from 'test/factories/make-episode'
import { makePrismaSeason } from 'test/factories/make-season'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
// import { createAndAuthenticateUser } from 'src/lib/test/create-and-authenticate-user'

describe('Get Next Episode (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('[POST] /episodes/next', async () => {
    const animePrisma = await makePrismaAnime({
      title: 'Jujutsu',
    })

    const seasonPrisma01 = await makePrismaSeason({
      title: 'Temporada 01',
      animeId: animePrisma.id,
    })

    await makePrismaEpisode({
      title: 'Episode 01',
      seasonId: seasonPrisma01.id,
      index: 1,
    })

    const episodePrisma02 = await makePrismaEpisode({
      title: 'Episode 02',
      seasonId: seasonPrisma01.id,
      index: 2,
    })

    const seasonPrisma02 = await makePrismaSeason({
      title: 'Temporada 02',
      animeId: animePrisma.id,
    })

    await makePrismaEpisode({
      title: 'Episode 01',
      seasonId: seasonPrisma02.id,
      slug: Slug.createFromText('temporada-02-episode-01'),
      index: 1,
    })

    await makePrismaEpisode({
      title: 'Episode 02',
      seasonId: seasonPrisma02.id,
      slug: Slug.createFromText('temporada-02-episode-02'),
      index: 2,
    })

    const response = await request(app.server).post(`/episodes/next`).send({
      seasonId: seasonPrisma01.id.toString(),
      animeId: animePrisma.id.toString(),
      currentIndex: episodePrisma02.index,
    })

    expect(response.statusCode).toEqual(200)

    expect(response.body.episode.seasonId).toBe(seasonPrisma02.id.toString())
    expect(response.body.episode.title).toBe('Episode 01')
  })
})
