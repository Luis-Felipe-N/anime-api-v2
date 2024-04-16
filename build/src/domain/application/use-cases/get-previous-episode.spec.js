"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const in_memory_episodes_repository_1 = require("test/repositories/in-memory-episodes-repository");
const make_episode_1 = require("test/factories/make-episode");
const get_previous_episode_1 = require("./get-previous-episode");
const in_memory_seasons_repository_1 = require("test/repositories/in-memory-seasons-repository");
const make_season_1 = require("test/factories/make-season");
let inMemoryEpisodesRepository;
let inMemorySeasonsRepository;
let sut;
describe('Get Next Episode', () => {
    beforeEach(() => {
        inMemoryEpisodesRepository = new in_memory_episodes_repository_1.InMemoryEpisodesRepository();
        inMemorySeasonsRepository = new in_memory_seasons_repository_1.InMemorySeasonsRepository(inMemoryEpisodesRepository);
        sut = new get_previous_episode_1.GetPreviousEpisodeUseCase(inMemoryEpisodesRepository, inMemorySeasonsRepository);
    });
    it('should be able to get the previous episode', async () => {
        const season = (0, make_season_1.makeSeason)();
        const season2 = (0, make_season_1.makeSeason)();
        await inMemorySeasonsRepository.create(season);
        await inMemorySeasonsRepository.create(season2);
        await inMemoryEpisodesRepository.create((0, make_episode_1.makeEpisode)({
            seasonId: season.id,
            index: 1,
        }));
        await inMemoryEpisodesRepository.create((0, make_episode_1.makeEpisode)({
            seasonId: season.id,
            index: 2,
        }));
        await inMemoryEpisodesRepository.create((0, make_episode_1.makeEpisode)({
            seasonId: season2.id,
            index: 1,
        }));
        const result = await sut.execute({
            seasonId: season.id.toString(),
            currentEpisodeIndex: 2,
        });
        expect(result.isSuccess()).toBe(true);
        if (result.isSuccess()) {
            expect(result.value.episode.seasonId).toBe(season.id);
            expect(result.value.episode.index).toBe(1);
        }
    });
});
