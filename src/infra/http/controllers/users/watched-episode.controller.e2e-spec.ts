import { app } from '@/app'
import { prisma } from '@/infra/database/prisma/prisma'
import request from 'supertest'
import { makePrismaAnime } from 'test/factories/make-anime'
import { makePrismaEpisode } from 'test/factories/make-episode'
import { makePrismaSeason } from 'test/factories/make-season'

describe('Create Anime (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('[POST] /watched', async () => {
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
            .post('/watched')
            .set('Authorization', `Bearer ${token}`)
            .send({
                episodeId: episode.id.toString(),
                duration: 100
            })

        const watchedOnDatabase = await prisma.watched.findMany({
            where: {
                id: response.body.watchedEpisode.id
            },
        })

        console.log(response.body)
        expect(watchedOnDatabase).toBeTruthy()
        expect(response.statusCode).toEqual(200)
    })
})
