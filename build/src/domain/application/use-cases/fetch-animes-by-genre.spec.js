"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const in_memory_animes_repository_1 = require("test/repositories/in-memory-animes-repository");
const in_memory_seasons_repository_1 = require("test/repositories/in-memory-seasons-repository");
const fetch_animes_by_genre_1 = require("./fetch-animes-by-genre");
const in_memory_genres_repository_1 = require("test/repositories/in-memory-genres-repository");
const in_memory_episodes_repository_1 = require("test/repositories/in-memory-episodes-repository");
const make_genre_1 = require("test/factories/make-genre");
const make_anime_1 = require("test/factories/make-anime");
const genre_list_1 = require("@/domain/enterprise/entities/genre-list");
let inMemoryAnimesRepository;
let inMemoryGenresRepository;
let inMemorySeasonsRepository;
let inMemoryEpisodesRepository;
let sut;
describe('Fetch Animes by Season', () => {
    beforeEach(() => {
        inMemoryEpisodesRepository = new in_memory_episodes_repository_1.InMemoryEpisodesRepository();
        inMemoryGenresRepository = new in_memory_genres_repository_1.InMemoryGenresRepository();
        inMemorySeasonsRepository = new in_memory_seasons_repository_1.InMemorySeasonsRepository(inMemoryEpisodesRepository);
        inMemoryAnimesRepository = new in_memory_animes_repository_1.InMemoryAnimesRepository(inMemorySeasonsRepository, inMemoryGenresRepository);
        inMemoryGenresRepository = new in_memory_genres_repository_1.InMemoryGenresRepository();
        sut = new fetch_animes_by_genre_1.FetchAnimesByGenreUseCase(inMemoryAnimesRepository, inMemoryGenresRepository);
    });
    it('should be able to fetch animes by genre', async () => {
        const genreAcao = (0, make_genre_1.makeGenre)({ title: 'acao' });
        const genreTerror = (0, make_genre_1.makeGenre)({ title: 'terror' });
        await inMemoryGenresRepository.create(genreAcao);
        await inMemoryGenresRepository.create(genreTerror);
        await inMemoryAnimesRepository.create((0, make_anime_1.makeAnime)({
            title: 'Anime de ação',
            genres: new genre_list_1.GenreList([genreAcao]),
        }));
        await inMemoryAnimesRepository.create((0, make_anime_1.makeAnime)({
            title: 'Anime de terror',
            genres: new genre_list_1.GenreList([genreTerror]),
        }));
        const result = await sut.execute({
            genreSlug: genreAcao.slug.value,
            page: 1,
        });
        expect(result.isSuccess()).toBe(true);
        if (result.isSuccess()) {
            expect(result.value.animes).toHaveLength(1);
            expect(result.value.animes).toEqual([
                expect.objectContaining({
                    title: 'Anime de ação',
                }),
            ]);
        }
    });
    // it('should not be able to fetch animes of a non-existent genre', async () => {
    //   const genreAcao = makeGenre({ title: 'acao' })
    //   const genreTerror = makeGenre({ title: 'terror' })
    //   await inMemoryGenresRepository.create(genreAcao)
    //   await inMemoryGenresRepository.create(genreTerror)
    //   await inMemoryAnimesRepository.create(
    //     makeAnime({
    //       title: 'Anime de ação',
    //       genres: new GenreList([genreAcao]),
    //     }),
    //   )
    //   await inMemoryAnimesRepository.create(
    //     makeAnime({
    //       title: 'Anime de terror',
    //       genres: new GenreList([genreTerror]),
    //     }),
    //   )
    //   const result = await sut.execute({
    //     genreSlug: 'aventura',
    //     page: 1,
    //   })
    //   expect(result.isFailure()).toBe(true)
    // })
});
