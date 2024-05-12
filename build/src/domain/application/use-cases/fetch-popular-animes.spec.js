"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const in_memory_animes_repository_1 = require("test/repositories/in-memory-animes-repository");
const in_memory_seasons_repository_1 = require("test/repositories/in-memory-seasons-repository");
const in_memory_genres_repository_1 = require("test/repositories/in-memory-genres-repository");
const in_memory_episodes_repository_1 = require("test/repositories/in-memory-episodes-repository");
const make_genre_1 = require("test/factories/make-genre");
const genre_list_1 = require("@/domain/enterprise/entities/genre-list");
const fetch_popular_animes_1 = require("./fetch-popular-animes");
const make_anime_1 = require("test/factories/make-anime");
let inMemoryAnimesRepository;
let inMemoryGenresRepository;
let inMemorySeasonsRepository;
let inMemoryEpisodesRepository;
let sut;
describe('Fetch Animes by Season', () => {
    beforeEach(() => {
        inMemoryEpisodesRepository = new in_memory_episodes_repository_1.InMemoryEpisodesRepository();
        inMemoryGenresRepository = new in_memory_genres_repository_1.InMemoryGenresRepository();
        inMemorySeasonsRepository = new in_memory_seasons_repository_1.InMemorySeasonsRepository(inMemoryEpisodesRepository);
        inMemoryAnimesRepository = new in_memory_animes_repository_1.InMemoryAnimesRepository(inMemorySeasonsRepository, inMemoryGenresRepository);
        sut = new fetch_popular_animes_1.FetchPopularAnimesUseCase(inMemoryAnimesRepository);
    });
    it('should be able to fetch popular animes', async () => {
        const genreAcao = (0, make_genre_1.makeGenre)({ title: 'acao' });
        const genreTerror = (0, make_genre_1.makeGenre)({ title: 'terror' });
        await inMemoryGenresRepository.create(genreAcao);
        await inMemoryGenresRepository.create(genreTerror);
        (0, make_anime_1.makeAnime)({
            title: '01 Anime de ação',
            genres: new genre_list_1.GenreList([genreAcao]),
            rating: 2,
        });
        for (let index = 1; index <= 20; index++) {
            await inMemoryAnimesRepository.create((0, make_anime_1.makeAnime)({
                title: 'Anime de ação',
                genres: new genre_list_1.GenreList([genreAcao]),
                rating: 8,
            }));
        }
        await inMemoryAnimesRepository.create((0, make_anime_1.makeAnime)({
            title: 'Anime de terror',
            genres: new genre_list_1.GenreList([genreTerror]),
        }));
        const result = await sut.execute();
        expect(result.isSuccess()).toBe(true);
        if (result.isSuccess()) {
            expect(result.value.animes).toHaveLength(5);
            expect(result.value.animes).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    rating: 8,
                }),
            ]));
        }
    });
});
