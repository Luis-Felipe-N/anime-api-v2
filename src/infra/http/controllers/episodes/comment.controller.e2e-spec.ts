import { app } from '@/app'
import request from 'supertest'

import { makePrismaAnime } from 'test/factories/make-anime'
import { makePrismaEpisode } from 'test/factories/make-episode'
import { makePrismaSeason } from 'test/factories/make-season'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Comment On Episode (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('[POST] /episodes/[:episodeId]/comments', async () => {
    await request(app.server).post('/users').send({
      name: 'Luis Felipe',
      email: 'luiss@gmail.com',
      password: '123456',
    })

    const sessionsResponse = await request(app.server).post('/sessions').send({
      email: 'luiss@gmail.com',
      password: '123456',
    })

    const { token } = sessionsResponse.body

    const anime = await makePrismaAnime({
      title: 'Jujutsu',
    })

    const season = await makePrismaSeason({
      title: 'Temporada 01',
      animeId: anime.id,
    })

    const episode = await makePrismaEpisode({
      title: 'Episode 01',
      seasonId: season.id,
      index: 1,
    })

    const response = await request(app.server)
      .post(`/episodes/${episode.id}/comments`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        content: 'Conteúdo do comentário',
      })

    console.log(response)
    expect(response.statusCode).toEqual(200)

    expect(response.body.comment.content).toBe('Conteúdo do comentário')
  })
})
