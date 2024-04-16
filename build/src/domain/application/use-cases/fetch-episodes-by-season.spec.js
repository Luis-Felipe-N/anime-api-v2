"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const in_memory_episodes_repository_1 = require("test/repositories/in-memory-episodes-repository");
const make_episode_1 = require("test/factories/make-episode");
const resource_not_found_error_1 = require("./errors/resource-not-found-error");
const make_season_1 = require("test/factories/make-season");
const in_memory_seasons_repository_1 = require("test/repositories/in-memory-seasons-repository");
const fetch_episodes_by_season_1 = require("./fetch-episodes-by-season");
let inMemoryEpisodesRepository;
let inMemorySeasonsRepository;
let sut;
describe('Fetch Episodes by Season', () => {
    beforeEach(() => {
        inMemoryEpisodesRepository = new in_memory_episodes_repository_1.InMemoryEpisodesRepository();
        inMemorySeasonsRepository = new in_memory_seasons_repository_1.InMemorySeasonsRepository(inMemoryEpisodesRepository);
        sut = new fetch_episodes_by_season_1.FetchEpisodeBySeasonUseCase(inMemoryEpisodesRepository, inMemorySeasonsRepository);
    });
    it('should be able to fetch episodes of a season', async () => {
        const season = (0, make_season_1.makeSeason)();
        await inMemorySeasonsRepository.create(season);
        await inMemoryEpisodesRepository.create((0, make_episode_1.makeEpisode)({
            seasonId: season.id,
            title: 'Titulo do episódio 01',
        }));
        await inMemoryEpisodesRepository.create((0, make_episode_1.makeEpisode)({
            seasonId: season.id,
            title: 'Titulo do episódio 02',
        }));
        const result = await sut.execute({
            seasonId: season.id.toString(),
            page: 1,
        });
        expect(result.isSuccess()).toBe(true);
        if (result.isSuccess()) {
            expect(result.value.episodes).toHaveLength(2);
            expect(result.value.episodes).toEqual([
                expect.objectContaining({
                    seasonId: season.id,
                    title: 'Titulo do episódio 01',
                }),
                expect.objectContaining({
                    seasonId: season.id,
                    title: 'Titulo do episódio 02',
                }),
            ]);
        }
    });
    it('should not be able to fetch episodes of a non-existent season', async () => {
        const result = await sut.execute({
            seasonId: 'non-existent-season',
            page: 1,
        });
        expect(result.isFailure()).toBe(true);
        expect(result.value).toBeInstanceOf(resource_not_found_error_1.ResourceNotFoundError);
    });
});
