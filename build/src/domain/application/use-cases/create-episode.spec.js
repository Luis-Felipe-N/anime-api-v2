"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const in_memory_animes_repository_1 = require("test/repositories/in-memory-animes-repository");
const create_episode_1 = require("./create-episode");
const in_memory_episodes_repository_1 = require("test/repositories/in-memory-episodes-repository");
const make_anime_1 = require("test/factories/make-anime");
const in_memory_seasons_repository_1 = require("test/repositories/in-memory-seasons-repository");
const in_memory_genres_repository_1 = require("test/repositories/in-memory-genres-repository");
// import { InMemoryAnimesRepository } from 'test/repositories/in-memory-animes-repository'
let inMemoryEpisodesRepository;
let inMemorySeasonsRepository;
let inMemoryGenresRepository;
let inMemoryAnimesRepository;
let sut;
describe('Create Anime', () => {
    beforeEach(() => {
        inMemoryEpisodesRepository = new in_memory_episodes_repository_1.InMemoryEpisodesRepository();
        inMemorySeasonsRepository = new in_memory_seasons_repository_1.InMemorySeasonsRepository(inMemoryEpisodesRepository);
        inMemoryGenresRepository = new in_memory_genres_repository_1.InMemoryGenresRepository();
        inMemoryAnimesRepository = new in_memory_animes_repository_1.InMemoryAnimesRepository(inMemorySeasonsRepository, inMemoryGenresRepository);
        sut = new create_episode_1.CreateEpisodeUseCase(inMemoryEpisodesRepository, inMemoryAnimesRepository);
    });
    it('should be able to create a episode', async () => {
        const anime = (0, make_anime_1.makeAnime)();
        await inMemoryAnimesRepository.create(anime);
        const result = await sut.execute({
            animeId: anime.id.toString(),
            title: 'Titulo do episódio',
            description: 'Descrição do episódio',
            cover: 'episode-cover-link',
            duration: 800,
            index: 0,
            season: 1,
        });
        expect(result.isSuccess()).toBe(true);
        if (result.isSuccess()) {
            expect(result.value.episode.title).toEqual('Titulo do episódio');
            expect(inMemoryEpisodesRepository.items[0].id).toEqual(result.value.episode.id);
        }
    });
});
