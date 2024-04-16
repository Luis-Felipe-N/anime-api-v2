"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const in_memory_episodes_repository_1 = require("test/repositories/in-memory-episodes-repository");
const make_episode_1 = require("test/factories/make-episode");
const resource_not_found_error_1 = require("./errors/resource-not-found-error");
const make_season_1 = require("test/factories/make-season");
const in_memory_seasons_repository_1 = require("test/repositories/in-memory-seasons-repository");
const fetch_seasons_by_anime_1 = require("./fetch-seasons-by-anime");
const in_memory_animes_repository_1 = require("test/repositories/in-memory-animes-repository");
const in_memory_genres_repository_1 = require("test/repositories/in-memory-genres-repository");
const make_anime_1 = require("test/factories/make-anime");
let inMemoryEpisodesRepository;
let inMemoryGenresRepository;
let inMemoryAnimesRepository;
let inMemorySeasonsRepository;
let sut;
describe('Fetch Seasons by Anime', () => {
    beforeEach(() => {
        inMemoryEpisodesRepository = new in_memory_episodes_repository_1.InMemoryEpisodesRepository();
        inMemoryGenresRepository = new in_memory_genres_repository_1.InMemoryGenresRepository();
        inMemorySeasonsRepository = new in_memory_seasons_repository_1.InMemorySeasonsRepository(inMemoryEpisodesRepository);
        inMemoryAnimesRepository = new in_memory_animes_repository_1.InMemoryAnimesRepository(inMemorySeasonsRepository, inMemoryGenresRepository);
        sut = new fetch_seasons_by_anime_1.FetchSeasonsByAnimeUseCase(inMemorySeasonsRepository, inMemoryAnimesRepository);
    });
    it('should be able to fetch seasons of an anime', async () => {
        const anime = (0, make_anime_1.makeAnime)({
            title: 'Titulo do episódio 01',
        });
        const season = (0, make_season_1.makeSeason)({
            animeId: anime.id,
            title: 'Titulo do episódio 01',
        });
        await inMemorySeasonsRepository.create(season);
        await inMemoryAnimesRepository.create(anime);
        await inMemoryEpisodesRepository.create((0, make_episode_1.makeEpisode)({
            seasonId: season.id,
            title: 'Titulo do episódio 02',
        }));
        const result = await sut.execute({
            animeId: anime.id.toString(),
        });
        expect(result.isSuccess()).toBe(true);
        if (result.isSuccess()) {
            expect(result.value.seasons).toHaveLength(1);
            expect(result.value.seasons).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    id: season.id,
                    title: 'Titulo do episódio 01',
                }),
            ]));
        }
    });
    it('should not be able to fetch episodes of a non-existent season', async () => {
        const result = await sut.execute({
            animeId: 'non-existent-anime',
        });
        expect(result.isFailure()).toBe(true);
        expect(result.value).toBeInstanceOf(resource_not_found_error_1.ResourceNotFoundError);
    });
});
