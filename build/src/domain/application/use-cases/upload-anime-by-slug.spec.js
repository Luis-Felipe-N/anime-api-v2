"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const in_memory_animes_repository_1 = require("test/repositories/in-memory-animes-repository");
const in_memory_seasons_repository_1 = require("test/repositories/in-memory-seasons-repository");
const in_memory_episodes_repository_1 = require("test/repositories/in-memory-episodes-repository");
const upload_anime_by_slug_1 = require("@/domain/application/use-cases/upload-anime-by-slug");
const in_memory_genres_repository_1 = require("test/repositories/in-memory-genres-repository");
let inMemoryAnimesRepository;
let inMemoryEpisodesRepository;
let inMemorySeasonsRepository;
let inMemoryGenresRepository;
let sut;
describe('Upload Anime By Slug', () => {
    beforeEach(() => {
        inMemoryGenresRepository = new in_memory_genres_repository_1.InMemoryGenresRepository();
        inMemoryEpisodesRepository = new in_memory_episodes_repository_1.InMemoryEpisodesRepository();
        inMemorySeasonsRepository = new in_memory_seasons_repository_1.InMemorySeasonsRepository(inMemoryEpisodesRepository);
        inMemoryAnimesRepository = new in_memory_animes_repository_1.InMemoryAnimesRepository(inMemorySeasonsRepository, inMemoryGenresRepository);
        sut = new upload_anime_by_slug_1.UploadAnimeBySlugUseCase(inMemoryAnimesRepository);
    });
    it('should be able to upload an anime by slug', async () => {
        const result = await sut.execute({
            slug: 'castlevania',
        });
        expect(result.isSuccess());
        if (result.isSuccess()) {
            expect(result.value.anime.title).toBe('Castlevania');
        }
    });
    // it('should be able to create an anime with seasons', async () => {
    //   const season = makeSeason({}, new UniqueEntityId('temp-01'))
    //   const result = await sut.execute({
    //     title: 'Jujutsu',
    //     banner: 'banner-link',
    //     cover: 'cover-link',
    //     description: 'Descrição do anime',
    //     nsfw: false,
    //     seasons: [season],
    //   })
    //   expect(result.isSuccess()).toBe(true)
    //   if (result.isSuccess()) {
    //     expect(result.value.anime.slug.value).toEqual('jujutsu')
    //     expect(inMemorySeasonsRepository.items).toEqual(
    //       expect.arrayContaining([
    //         expect.objectContaining({
    //           id: new UniqueEntityId('temp-01'),
    //         }),
    //       ]),
    //     )
    //   }
    // })
});
