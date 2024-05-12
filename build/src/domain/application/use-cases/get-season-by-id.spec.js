"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const in_memory_seasons_repository_1 = require("test/repositories/in-memory-seasons-repository");
const get_season_by_id_1 = require("./get-season-by-id");
const in_memory_episodes_repository_1 = require("test/repositories/in-memory-episodes-repository");
const make_season_1 = require("test/factories/make-season");
const unique_entity_id_1 = require("@/core/entities/unique-entity-id");
const resource_not_found_error_1 = require("./errors/resource-not-found-error");
let inMemorySeasonsRepository;
let inMemoryEpisodesRepository;
let sut;
describe('Get Season by id', () => {
    beforeEach(() => {
        inMemoryEpisodesRepository = new in_memory_episodes_repository_1.InMemoryEpisodesRepository();
        inMemorySeasonsRepository = new in_memory_seasons_repository_1.InMemorySeasonsRepository(inMemoryEpisodesRepository);
        sut = new get_season_by_id_1.GetSeasonByIdUseCase(inMemorySeasonsRepository);
    });
    it('should be able to get season by id', async () => {
        const newSeason = (0, make_season_1.makeSeason)({}, new unique_entity_id_1.UniqueEntityId('id-da-season'));
        await inMemorySeasonsRepository.create(newSeason);
        const result = await sut.execute({
            id: 'id-da-season',
        });
        expect(result.isSuccess()).toBe(true);
    });
    it('should not be able to get season with non-exists id', async () => {
        const result = await sut.execute({
            id: 'non-exists-id',
        });
        expect(result.isFailure()).toBe(true);
        expect(result.value).toBeInstanceOf(resource_not_found_error_1.ResourceNotFoundError);
    });
});
