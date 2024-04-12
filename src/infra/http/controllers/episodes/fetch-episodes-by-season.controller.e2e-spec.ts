import { app } from '@/app'
import { Slug } from '@/core/values-objects/slug'
import request from 'supertest'

import { makePrismaAnime } from 'test/factories/make-anime'
import { makePrismaEpisode } from 'test/factories/make-episode'
import { makePrismaSeason } from 'test/factories/make-season'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Fetch Episodes By Season (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('[GET] /episodes/[:seasonId]', async () => {
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
      slug: Slug.createFromText('temporada-01-episode-02'),
    })

    await makePrismaEpisode({
      title: 'Episodio 02',
      slug: Slug.createFromText('temporada-02-episode-02'),
      seasonId: seasonPrisma02.id,
    })

    const response = await request(app.server).get(
      `/episodes/season/${seasonPrisma02.id}`,
    )

    expect(response.statusCode).toEqual(200)

    expect(response.body.episodes[0].title).toBe('Episodio 02')
  })
})
