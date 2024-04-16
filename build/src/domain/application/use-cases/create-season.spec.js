"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_season_1 = require("./create-season");
const in_memory_seasons_repository_1 = require("test/repositories/in-memory-seasons-repository");
const make_episode_1 = require("test/factories/make-episode");
const unique_entity_id_1 = require("@/core/entities/unique-entity-id");
const make_anime_1 = require("test/factories/make-anime");
const in_memory_animes_repository_1 = require("test/repositories/in-memory-animes-repository");
const in_memory_episodes_repository_1 = require("test/repositories/in-memory-episodes-repository");
const in_memory_genres_repository_1 = require("test/repositories/in-memory-genres-repository");
let inMemorySeasonsRepository;
let inMemoryAnimesRepository;
let inMemoryEpisodesRepository;
let inMemoryGenresRepository;
let sut;
describe('Create Season', () => {
    beforeEach(() => {
        inMemoryEpisodesRepository = new in_memory_episodes_repository_1.InMemoryEpisodesRepository();
        inMemoryGenresRepository = new in_memory_genres_repository_1.InMemoryGenresRepository();
        inMemorySeasonsRepository = new in_memory_seasons_repository_1.InMemorySeasonsRepository(inMemoryEpisodesRepository);
        inMemoryAnimesRepository = new in_memory_animes_repository_1.InMemoryAnimesRepository(inMemorySeasonsRepository, inMemoryGenresRepository);
        sut = new create_season_1.CreateSeasonUseCase(inMemorySeasonsRepository, inMemoryAnimesRepository);
    });
    it('should be able to create a season', async () => {
        const episode = (0, make_episode_1.makeEpisode)({}, new unique_entity_id_1.UniqueEntityId('episode-01'));
        const anime = (0, make_anime_1.makeAnime)();
        await inMemoryAnimesRepository.create(anime);
        const result = await sut.execute({
            title: 'Mob Psycho 100 II',
            animeId: anime.id.toString(),
            episodes: [episode],
        });
        expect(result.isSuccess()).toBe(true);
        if (result.isSuccess()) {
            expect(result.value.season.title).toEqual('Mob Psycho 100 II');
            expect(inMemorySeasonsRepository.items[0].id).toEqual(result.value.season.id);
        }
    });
    it('should be able to create a season with episodes', async () => {
        const episode = (0, make_episode_1.makeEpisode)({}, new unique_entity_id_1.UniqueEntityId('episode-01'));
        const anime = (0, make_anime_1.makeAnime)();
        await inMemoryAnimesRepository.create(anime);
        const result = await sut.execute({
            title: 'Mob Psycho 100 II',
            animeId: anime.id.toString(),
            episodes: [episode],
        });
        expect(result.isSuccess()).toBe(true);
        if (result.isSuccess()) {
            expect(result.value.season.title).toEqual('Mob Psycho 100 II');
            expect(inMemoryEpisodesRepository.items).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    id: new unique_entity_id_1.UniqueEntityId('episode-01'),
                }),
            ]));
        }
    });
});
