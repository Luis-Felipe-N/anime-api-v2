import { app } from 'src/app'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import request from 'supertest'

import { makePrismaAnime } from 'test/factories/make-anime'
import { makePrismaComment } from 'test/factories/make-comment'
import { makePrismaEpisode } from 'test/factories/make-episode'
import { makePrismaSeason } from 'test/factories/make-season'
import { makePrismaUser } from 'test/factories/make-user'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Comment On Episode (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('[POST] /episodes/[:episodeId]/comments', async () => {
    const user = await makePrismaUser({
      name: 'Luis Felipe',
      email: 'luiss@gmail.com',
    })

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

    const comment = await makePrismaComment({
      authorId: user.id,
      episodeId: episode.id,
      content: 'Conteúdo do comentário'
    })

    const response = await request(app.server)
      .get(`/episodes/${episode.id}/comments`)

    expect(response.statusCode).toEqual(200)

    expect(response.body.comments[0].content).toBe('Conteúdo do comentário')
  })
})
