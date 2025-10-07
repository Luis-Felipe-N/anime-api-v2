import { app } from 'src/app'
import { prisma } from 'src/infra/database/prisma/prisma'
import request from 'supertest'

import { makePrismaAnime } from 'test/factories/make-anime'
import { makePrismaEpisode } from 'test/factories/make-episode'
import { makePrismaSeason } from 'test/factories/make-season'
import { makePrismaUser } from 'test/factories/make-user'
import { makePrismaWatchedEpisode } from 'test/factories/make-watched-episode'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Fetch Watched Episode (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('[GET] /watched', async () => {
    await request(app.server).post('/users').send({
      name: 'Luis Felipe',
      email: 'luiss@gmail.com',
      password: '123456',
      avatar: ''
    })

    const sessionsResponse = await request(app.server).post('/sessions').send({
      email: 'luiss@gmail.com',
      password: '123456',
    })

    const { token } = sessionsResponse.body

    const userResponse = await request(app.server).get('/me').set('Authorization', `Bearer ${token}`)

    const { user } = userResponse.body

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

    const watchedEpisode01 = await makePrismaWatchedEpisode({
      authorId: user.id,
      episodeId: episode.id
    })

    const response = await request(app.server)
      .get(`/watched`)
      .set('Authorization', `Bearer ${token}`)

    const watchedEpisodesOnDatabase = await prisma.watched.findMany({
      where: {
        authorId: user.id
      }
    })
    console.log(response)
    expect(response.statusCode).toEqual(200)
    expect(watchedEpisodesOnDatabase[0]).toBeTruthy()
    expect(watchedEpisodesOnDatabase[0]?.id).toEqual(watchedEpisode01.id.toString())
    expect(watchedEpisodesOnDatabase[0]?.authorId).toEqual(user.id)
  })
})
