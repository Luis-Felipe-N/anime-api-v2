"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const in_memory_episodes_repository_1 = require("test/repositories/in-memory-episodes-repository");
const make_episode_1 = require("test/factories/make-episode");
const get_next_episode_1 = require("./get-next-episode");
const resource_not_found_error_1 = require("./errors/resource-not-found-error");
const make_season_1 = require("test/factories/make-season");
const in_memory_seasons_repository_1 = require("test/repositories/in-memory-seasons-repository");
const make_anime_1 = require("test/factories/make-anime");
const in_memory_animes_repository_1 = require("test/repositories/in-memory-animes-repository");
const in_memory_genres_repository_1 = require("test/repositories/in-memory-genres-repository");
let inMemoryEpisodesRepository;
let inMemorySeasonsRepository;
let inMemoryAnimesRepository;
let inMemoryGenresRepository;
let sut;
describe('Get Next Episode', () => {
    beforeEach(() => {
        inMemoryEpisodesRepository = new in_memory_episodes_repository_1.InMemoryEpisodesRepository();
        inMemoryGenresRepository = new in_memory_genres_repository_1.InMemoryGenresRepository();
        inMemorySeasonsRepository = new in_memory_seasons_repository_1.InMemorySeasonsRepository(inMemoryEpisodesRepository);
        inMemoryAnimesRepository = new in_memory_animes_repository_1.InMemoryAnimesRepository(inMemorySeasonsRepository, inMemoryGenresRepository);
        sut = new get_next_episode_1.GetNextEpisodeUseCase(inMemoryEpisodesRepository, inMemorySeasonsRepository, inMemoryAnimesRepository);
        vi.useFakeTimers();
    });
    afterEach(() => {
        vi.useRealTimers();
    });
    it('should be able to get the next episode', async () => {
        const anime = (0, make_anime_1.makeAnime)();
        await inMemoryAnimesRepository.create(anime);
        const season = (0, make_season_1.makeSeason)({ animeId: anime.id });
        const season2 = (0, make_season_1.makeSeason)({ animeId: anime.id });
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
            animeId: anime.id.toString(),
            currentEpisodeIndex: 1,
        });
        expect(result.isSuccess()).toBe(true);
        if (result.isSuccess()) {
            expect(result.value.episode.seasonId).toBe(season.id);
            expect(result.value.episode.index).toBe(2);
        }
    });
    it('should be able to get the next episode of the next season', async () => {
        const anime = (0, make_anime_1.makeAnime)();
        await inMemoryAnimesRepository.create(anime);
        vi.setSystemTime(new Date(2022, 5, 20, 8, 0, 0));
        const season = (0, make_season_1.makeSeason)({ animeId: anime.id });
        vi.setSystemTime(new Date(2023, 5, 20, 8, 0, 0));
        const season2 = (0, make_season_1.makeSeason)({ animeId: anime.id });
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
            animeId: anime.id.toString(),
            currentEpisodeIndex: 2,
        });
        expect(result.isSuccess()).toBe(true);
        if (result.isSuccess()) {
            expect(result.value.episode.seasonId).toBe(season2.id);
            expect(result.value.episode.index).toBe(1);
        }
    });
    it('should not be able to get the next episode with invalid season', async () => {
        const anime = (0, make_anime_1.makeAnime)();
        await inMemoryAnimesRepository.create(anime);
        const season = (0, make_season_1.makeSeason)({ animeId: anime.id });
        await inMemorySeasonsRepository.create(season);
        const episode = (0, make_episode_1.makeEpisode)({
            seasonId: season.id,
            index: 1,
        });
        await inMemoryEpisodesRepository.create(episode);
        const result = await sut.execute({
            seasonId: 's',
            animeId: anime.id.toString(),
            currentEpisodeIndex: 1,
        });
        expect(result.isFailure()).toBe(true);
        expect(result.value).toBeInstanceOf(resource_not_found_error_1.ResourceNotFoundError);
    });
});
