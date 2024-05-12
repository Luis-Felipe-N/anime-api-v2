"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const in_memory_animes_repository_1 = require("test/repositories/in-memory-animes-repository");
const in_memory_seasons_repository_1 = require("test/repositories/in-memory-seasons-repository");
const in_memory_episodes_repository_1 = require("test/repositories/in-memory-episodes-repository");
const in_memory_genres_repository_1 = require("test/repositories/in-memory-genres-repository");
const add_anime_on_watchlist_1 = require("./add-anime-on-watchlist");
const in_memory_users_repository_1 = require("test/repositories/in-memory-users-repository");
const in_memory_watchlist_repository_1 = require("test/repositories/in-memory-watchlist-repository");
const make_user_1 = require("test/factories/make-user");
const make_anime_1 = require("test/factories/make-anime");
let inMemoryUsersRepository;
let inMemoryWatchlistsRepository;
let inMemoryAnimesRepository;
let inMemoryEpisodesRepository;
let inMemoryGenresRepository;
let inMemorySeasonsRepository;
let sut;
describe('Add an Anime on Watchlist', () => {
    beforeEach(() => {
        inMemoryUsersRepository = new in_memory_users_repository_1.InMemoryUsersRepository();
        inMemoryWatchlistsRepository = new in_memory_watchlist_repository_1.InMemoryWatchlistsRepository();
        inMemoryEpisodesRepository = new in_memory_episodes_repository_1.InMemoryEpisodesRepository();
        inMemoryGenresRepository = new in_memory_genres_repository_1.InMemoryGenresRepository();
        inMemorySeasonsRepository = new in_memory_seasons_repository_1.InMemorySeasonsRepository(inMemoryEpisodesRepository);
        inMemoryAnimesRepository = new in_memory_animes_repository_1.InMemoryAnimesRepository(inMemorySeasonsRepository, inMemoryGenresRepository);
        sut = new add_anime_on_watchlist_1.AddAnimeOnWatchlistUseCase(inMemoryUsersRepository, inMemoryWatchlistsRepository);
    });
    it('should be able to add an anime in watchlist', async () => {
        const user = (0, make_user_1.makeUser)();
        const anime = (0, make_anime_1.makeAnime)();
        await inMemoryUsersRepository.create(user);
        await inMemoryAnimesRepository.create(anime);
        const result = await sut.execute({
            userId: user.id.toString(),
            animesIds: [anime.id.toString()],
        });
        expect(result.isSuccess()).toBe(true);
        if (result.isSuccess()) {
            console.log(result.value.watchlist.animes);
            expect(result.value.watchlist.userId).toEqual(user.id);
            // expect(result.value.watchlist.animes.getItems()).toEqual(expect.arrayContaining([
            //   expect.objectContaining({
            //     id: anime.id
            //   })
            // ]))
        }
    });
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
});
