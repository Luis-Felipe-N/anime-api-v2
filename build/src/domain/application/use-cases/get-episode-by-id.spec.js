"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const in_memory_episodes_repository_1 = require("test/repositories/in-memory-episodes-repository");
const resource_not_found_error_1 = require("./errors/resource-not-found-error");
const make_episode_1 = require("test/factories/make-episode");
const get_episode_by_id_1 = require("./get-episode-by-id");
const unique_entity_id_1 = require("@/core/entities/unique-entity-id");
let inMemoryEpisodesRepository;
let sut;
describe('Get Episode by id', () => {
    beforeEach(() => {
        inMemoryEpisodesRepository = new in_memory_episodes_repository_1.InMemoryEpisodesRepository();
        sut = new get_episode_by_id_1.GetEpisodeByIdUseCase(inMemoryEpisodesRepository);
    });
    it('should be able to get episode by id', async () => {
        const newEpisode = (0, make_episode_1.makeEpisode)({}, new unique_entity_id_1.UniqueEntityId('id-do-episodio'));
        await inMemoryEpisodesRepository.create(newEpisode);
        const result = await sut.execute({
            id: 'id-do-episodio',
        });
        expect(result.isSuccess()).toBe(true);
    });
    it('should not be able to get episode with non-exists id', async () => {
        const result = await sut.execute({
            id: 'non-exists-id',
        });
        expect(result.isFailure()).toBe(true);
        expect(result.value).toBeInstanceOf(resource_not_found_error_1.ResourceNotFoundError);
    });
});
