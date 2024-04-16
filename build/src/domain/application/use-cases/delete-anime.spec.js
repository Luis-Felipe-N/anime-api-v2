"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const in_memory_animes_repository_1 = require("test/repositories/in-memory-animes-repository");
const delete_anime_1 = require("./delete-anime");
const make_anime_1 = require("test/factories/make-anime");
const unique_entity_id_1 = require("@/core/entities/unique-entity-id");
const resource_not_found_error_1 = require("./errors/resource-not-found-error");
const in_memory_seasons_repository_1 = require("test/repositories/in-memory-seasons-repository");
const in_memory_episodes_repository_1 = require("test/repositories/in-memory-episodes-repository");
const in_memory_genres_repository_1 = require("test/repositories/in-memory-genres-repository");
let inMemoryAnimesRepository;
let inMemorySeasonsRepository;
let inMemoryEpisodesRepository;
let inMemoryGenresRepository;
let sut;
describe('Delete Anime', () => {
    beforeEach(() => {
        inMemoryEpisodesRepository = new in_memory_episodes_repository_1.InMemoryEpisodesRepository();
        inMemoryGenresRepository = new in_memory_genres_repository_1.InMemoryGenresRepository();
        inMemorySeasonsRepository = new in_memory_seasons_repository_1.InMemorySeasonsRepository(inMemoryEpisodesRepository);
        inMemoryAnimesRepository = new in_memory_animes_repository_1.InMemoryAnimesRepository(inMemorySeasonsRepository, inMemoryGenresRepository);
        sut = new delete_anime_1.DeleteAnimeUseCase(inMemoryAnimesRepository);
    });
    it('should be able to delete an anime', async () => {
        const anime = (0, make_anime_1.makeAnime)({}, new unique_entity_id_1.UniqueEntityId('anime-id'));
        await inMemoryAnimesRepository.create(anime);
        const result = await sut.execute({
            id: 'anime-id',
            userId: 'user-id',
        });
        expect(result.isSuccess()).toBe(true);
        if (result.isSuccess()) {
            expect(inMemoryAnimesRepository.items).toHaveLength(0);
        }
    });
    it('should not be able to delete a non-existent anime', async () => {
        const anime = (0, make_anime_1.makeAnime)({}, new unique_entity_id_1.UniqueEntityId('anime-id'));
        await inMemoryAnimesRepository.create(anime);
        const result = await sut.execute({
            id: 'anime-id-02',
            userId: 'user-id',
        });
        expect(result.isFailure()).toBe(true);
        expect(result.value).toBeInstanceOf(resource_not_found_error_1.ResourceNotFoundError);
    });
});
