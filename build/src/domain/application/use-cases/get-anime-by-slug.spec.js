"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const in_memory_animes_repository_1 = require("test/repositories/in-memory-animes-repository");
const get_anime_by_slug_1 = require("./get-anime-by-slug");
const make_anime_1 = require("test/factories/make-anime");
const slug_1 = require("@/core/values-objects/slug");
const resource_not_found_error_1 = require("./errors/resource-not-found-error");
const in_memory_seasons_repository_1 = require("test/repositories/in-memory-seasons-repository");
const in_memory_episodes_repository_1 = require("test/repositories/in-memory-episodes-repository");
const in_memory_genres_repository_1 = require("test/repositories/in-memory-genres-repository");
let inMemoryAnimesRepository;
let inMemorySeasonsRepository;
let inMemoryEpisodesRepository;
let inMemoryGenresRepository;
let sut;
describe('Get Anime by slug', () => {
    beforeEach(() => {
        inMemoryEpisodesRepository = new in_memory_episodes_repository_1.InMemoryEpisodesRepository();
        inMemorySeasonsRepository = new in_memory_seasons_repository_1.InMemorySeasonsRepository(inMemoryEpisodesRepository);
        inMemoryGenresRepository = new in_memory_genres_repository_1.InMemoryGenresRepository();
        inMemoryAnimesRepository = new in_memory_animes_repository_1.InMemoryAnimesRepository(inMemorySeasonsRepository, inMemoryGenresRepository);
        sut = new get_anime_by_slug_1.GetAnimeBySlugUseCase(inMemoryAnimesRepository);
    });
    it('should be able to get anime by slug', async () => {
        const animeCreated = (0, make_anime_1.makeAnime)({
            slug: slug_1.Slug.create('titulo-do-anime'),
        });
        await inMemoryAnimesRepository.create(animeCreated);
        const result = await sut.execute({
            slug: 'titulo-do-anime',
        });
        expect(result.isSuccess()).toBe(true);
    });
    it('should not be able to get anime with non-exists slug', async () => {
        const result = await sut.execute({
            slug: 'non-exists-slug',
        });
        expect(result.isFailure()).toBe(true);
        expect(result.value).toBeInstanceOf(resource_not_found_error_1.ResourceNotFoundError);
    });
});
