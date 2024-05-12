"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unique_entity_id_1 = require("@/core/entities/unique-entity-id");
const delete_episode_1 = require("./delete-episode");
const in_memory_episodes_repository_1 = require("test/repositories/in-memory-episodes-repository");
const make_episode_1 = require("test/factories/make-episode");
const resource_not_found_error_1 = require("./errors/resource-not-found-error");
let inMemoryEpisodesRepository;
let sut;
describe('Delete Episode', () => {
    beforeEach(() => {
        inMemoryEpisodesRepository = new in_memory_episodes_repository_1.InMemoryEpisodesRepository();
        sut = new delete_episode_1.DeleteEpisodeUseCase(inMemoryEpisodesRepository);
    });
    it('should be able to delete an episode', async () => {
        const episode = (0, make_episode_1.makeEpisode)({}, new unique_entity_id_1.UniqueEntityId('episode-id'));
        await inMemoryEpisodesRepository.create(episode);
        const result = await sut.execute({
            id: 'episode-id',
            userId: 'user-id',
        });
        expect(result.isSuccess()).toBe(true);
        if (result.isSuccess()) {
            expect(inMemoryEpisodesRepository.items).toHaveLength(0);
        }
    });
    it('should not be able to delete a non-existent episode', async () => {
        const episode = (0, make_episode_1.makeEpisode)({}, new unique_entity_id_1.UniqueEntityId('episode-id'));
        await inMemoryEpisodesRepository.create(episode);
        const result = await sut.execute({
            id: 'episode-id-02',
            userId: 'user-id',
        });
        expect(result.isFailure()).toBe(true);
        expect(result.value).toBeInstanceOf(resource_not_found_error_1.ResourceNotFoundError);
    });
});
