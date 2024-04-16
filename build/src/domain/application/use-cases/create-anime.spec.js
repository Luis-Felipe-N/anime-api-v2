"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const make_season_1 = require("test/factories/make-season");
const create_anime_1 = require("./create-anime");
const in_memory_animes_repository_1 = require("test/repositories/in-memory-animes-repository");
const unique_entity_id_1 = require("@/core/entities/unique-entity-id");
const in_memory_seasons_repository_1 = require("test/repositories/in-memory-seasons-repository");
const in_memory_episodes_repository_1 = require("test/repositories/in-memory-episodes-repository");
const make_genre_1 = require("test/factories/make-genre");
const in_memory_genres_repository_1 = require("test/repositories/in-memory-genres-repository");
let inMemoryAnimesRepository;
let inMemoryEpisodesRepository;
let inMemoryGenresRepository;
let inMemorySeasonsRepository;
let sut;
describe('Create Anime', () => {
    beforeEach(() => {
        inMemoryEpisodesRepository = new in_memory_episodes_repository_1.InMemoryEpisodesRepository();
        inMemoryGenresRepository = new in_memory_genres_repository_1.InMemoryGenresRepository();
        inMemorySeasonsRepository = new in_memory_seasons_repository_1.InMemorySeasonsRepository(inMemoryEpisodesRepository);
        inMemoryAnimesRepository = new in_memory_animes_repository_1.InMemoryAnimesRepository(inMemorySeasonsRepository, inMemoryGenresRepository);
        sut = new create_anime_1.CreateAnimeUseCase(inMemoryAnimesRepository);
    });
    it('should be able to create an anime', async () => {
        const result = await sut.execute({
            banner: 'banner-link',
            cover: 'cover-link',
            description: 'Descrição do anime',
            title: 'Jujutsu',
            nsfw: false,
            seasons: [],
            genres: [],
        });
        expect(result.isSuccess()).toBe(true);
        if (result.isSuccess()) {
            expect(result.value.anime.title).toEqual('Jujutsu');
            expect(inMemoryAnimesRepository.items[0].id).toEqual(result.value.anime.id);
        }
    });
    it('should be able to create an anime with seasons', async () => {
        const season = (0, make_season_1.makeSeason)({}, new unique_entity_id_1.UniqueEntityId('temp-01'));
        const result = await sut.execute({
            title: 'Jujutsu',
            banner: 'banner-link',
            cover: 'cover-link',
            description: 'Descrição do anime',
            nsfw: false,
            seasons: [season],
            genres: [],
        });
        expect(result.isSuccess()).toBe(true);
        if (result.isSuccess()) {
            expect(result.value.anime.slug.value).toEqual('jujutsu');
            expect(inMemorySeasonsRepository.items).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    id: new unique_entity_id_1.UniqueEntityId('temp-01'),
                }),
            ]));
        }
    });
    it('should be able to create an anime with genres', async () => {
        const genre = (0, make_genre_1.makeGenre)({}, new unique_entity_id_1.UniqueEntityId('genero-acao'));
        const result = await sut.execute({
            title: 'Jujutsu',
            banner: 'banner-link',
            cover: 'cover-link',
            description: 'Descrição do anime',
            nsfw: false,
            seasons: [],
            genres: [genre],
        });
        expect(result.isSuccess()).toBe(true);
        if (result.isSuccess()) {
            expect(result.value.anime.slug.value).toEqual('jujutsu');
            expect(inMemoryGenresRepository.items).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    id: new unique_entity_id_1.UniqueEntityId('genero-acao'),
                }),
            ]));
        }
    });
});
