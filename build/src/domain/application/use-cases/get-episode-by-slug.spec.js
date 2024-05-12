"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const in_memory_episodes_repository_1 = require("test/repositories/in-memory-episodes-repository");
const get_episode_by_slug_1 = require("./get-episode-by-slug");
const slug_1 = require("@/core/values-objects/slug");
const resource_not_found_error_1 = require("./errors/resource-not-found-error");
const make_episode_1 = require("test/factories/make-episode");
let inMemoryEpisodesRepository;
let sut;
describe('Get Episode by slug', () => {
    beforeEach(() => {
        inMemoryEpisodesRepository = new in_memory_episodes_repository_1.InMemoryEpisodesRepository();
        sut = new get_episode_by_slug_1.GetEpisodeBySlugUseCase(inMemoryEpisodesRepository);
    });
    it('should be able to get episode by slug', async () => {
        const newEpisode = (0, make_episode_1.makeEpisode)({
            slug: slug_1.Slug.create('titulo-do-episodio'),
        });
        await inMemoryEpisodesRepository.create(newEpisode);
        const result = await sut.execute({
            slug: 'titulo-do-episodio',
        });
        expect(result.isSuccess()).toBe(true);
    });
    it('should not be able to get episode with non-exists slug', async () => {
        const result = await sut.execute({
            slug: 'non-exists-slug',
        });
        expect(result.isFailure()).toBe(true);
        expect(result.value).toBeInstanceOf(resource_not_found_error_1.ResourceNotFoundError);
    });
});
