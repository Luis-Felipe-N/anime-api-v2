import { InMemoryAnimesRepository } from 'test/repositories/in-memory-animes-repository'
import { InMemorySeasonsRepository } from 'test/repositories/in-memory-seasons-repository'
import { InMemoryEpisodesRepository } from 'test/repositories/in-memory-episodes-repository'
import { InMemoryGenresRepository } from 'test/repositories/in-memory-genres-repository'
import { AnimeOnWatchlistUseCase } from './anime-on-watchlist'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { InMemoryWatchlistsRepository } from 'test/repositories/in-memory-watchlist-repository'
import { makeUser } from 'test/factories/make-user'
import { makeAnime } from 'test/factories/make-anime'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryWatchlistsRepository: InMemoryWatchlistsRepository
let inMemoryAnimesRepository: InMemoryAnimesRepository

let inMemoryEpisodesRepository: InMemoryEpisodesRepository
let inMemoryGenresRepository: InMemoryGenresRepository
let inMemorySeasonsRepository: InMemorySeasonsRepository
let sut: AnimeOnWatchlistUseCase

describe('Anime on Watchlist', () => {
    beforeEach(() => {
        inMemoryUsersRepository = new InMemoryUsersRepository()
        inMemoryWatchlistsRepository = new InMemoryWatchlistsRepository()
        inMemoryEpisodesRepository = new InMemoryEpisodesRepository()
        inMemoryGenresRepository = new InMemoryGenresRepository()
        inMemorySeasonsRepository = new InMemorySeasonsRepository(
            inMemoryEpisodesRepository,
        )
        inMemoryAnimesRepository = new InMemoryAnimesRepository(
            inMemorySeasonsRepository,
            inMemoryGenresRepository,
        )
        sut = new AnimeOnWatchlistUseCase(
            inMemoryUsersRepository,
            inMemoryWatchlistsRepository,
        )
    })

    it('should be able to  an anime in watchlist', async () => {
        const user = makeUser()
        const anime = makeAnime()

        await inMemoryUsersRepository.create(user)
        await inMemoryAnimesRepository.create(anime)

        const result = await sut.execute({
            userId: user.id.toString(),
            animesIds: [anime.id.toString()],
        })

        expect(result.isSuccess()).toBe(true)

        if (result.isSuccess()) {
            expect(result.value.watchlist.userId).toEqual(user.id)
            // expect(result.value.watchlist.animes.getItems()).toEqual(expect.arrayContaining([
            //   expect.objectContaining({
            //     id: anime.id
            //   })
            // ]))
        }
    })

    // it('should be able to create an anime with seasons', async () => {
    //   const season = makeSeason({}, new UniqueEntityId('temp-01'))

    //   const result = await sut.execute({
    //     title: 'Jujutsu',
    //     banner: 'banner-link',
    //     cover: 'cover-link',
    //     description: 'Descrição do anime',
    //     nsfw: false,
    //     seasons: [season],
    //     genres: [],
    //   })

    //   expect(result.isSuccess()).toBe(true)

    //   if (result.isSuccess()) {
    //     expect(result.value.anime.slug.value).toEqual('jujutsu')
    //     expect(inMemorySeasonsRepository.items).toEqual(
    //       expect.arrayContaining([
    //         expect.objectContaining({
    //           id: new UniqueEntityId('temp-01'),
    //         }),
    //       ]),
    //     )
    //   }
    // })
})
