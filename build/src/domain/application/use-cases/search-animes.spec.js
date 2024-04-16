"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const in_memory_animes_repository_1 = require("test/repositories/in-memory-animes-repository");
const in_memory_seasons_repository_1 = require("test/repositories/in-memory-seasons-repository");
const in_memory_genres_repository_1 = require("test/repositories/in-memory-genres-repository");
const in_memory_episodes_repository_1 = require("test/repositories/in-memory-episodes-repository");
const make_anime_1 = require("test/factories/make-anime");
const search_animes_1 = require("./search-animes");
let inMemoryAnimesRepository;
let inMemoryGenresRepository;
let inMemorySeasonsRepository;
let inMemoryEpisodesRepository;
let sut;
describe('Search Animes', () => {
    beforeEach(() => {
        inMemoryEpisodesRepository = new in_memory_episodes_repository_1.InMemoryEpisodesRepository();
        inMemoryGenresRepository = new in_memory_genres_repository_1.InMemoryGenresRepository();
        inMemorySeasonsRepository = new in_memory_seasons_repository_1.InMemorySeasonsRepository(inMemoryEpisodesRepository);
        inMemoryAnimesRepository = new in_memory_animes_repository_1.InMemoryAnimesRepository(inMemorySeasonsRepository, inMemoryGenresRepository);
        inMemoryGenresRepository = new in_memory_genres_repository_1.InMemoryGenresRepository();
        sut = new search_animes_1.SearchAnimeUseCase(inMemoryAnimesRepository);
    });
    it('should be able to search animes', async () => {
        await inMemoryAnimesRepository.create((0, make_anime_1.makeAnime)({
            title: 'Anime de ação',
        }));
        await inMemoryAnimesRepository.create((0, make_anime_1.makeAnime)({
            title: 'Anime de terror',
        }));
        const result = await sut.execute({
            keyword: 'acao',
            page: 1,
        });
        expect(result.isSuccess()).toBe(true);
        if (result.isSuccess()) {
            expect(result.value.animes).toHaveLength(1);
            expect(result.value.animes).toEqual([
                expect.objectContaining({
                    title: 'Anime de ação',
                }),
            ]);
        }
    });
});
