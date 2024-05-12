"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFetchAnimesByGenreUseCase = void 0;
const prisma_animes_repository_1 = require("../../database/repositories/prisma-animes-repository");
const prisma_seasons_repository_1 = require("../../database/repositories/prisma-seasons-repository");
const fetch_animes_by_genre_1 = require("@/domain/application/use-cases/fetch-animes-by-genre");
const prisma_genres_repository_1 = require("../../database/repositories/prisma-genres-repository");
const prisma_episodes_repository_1 = require("@/infra/database/repositories/prisma-episodes-repository");
function makeFetchAnimesByGenreUseCase() {
    const episodesRepository = new prisma_episodes_repository_1.PrismaEpisodesRepository();
    const seasonsRepository = new prisma_seasons_repository_1.PrismaSeasonsRepository(episodesRepository);
    const genresRepository = new prisma_genres_repository_1.PrismaGenresRepository();
    const animesRepository = new prisma_animes_repository_1.PrismaAnimesRepository(seasonsRepository, genresRepository);
    const useCase = new fetch_animes_by_genre_1.FetchAnimesByGenreUseCase(animesRepository, genresRepository);
    return useCase;
}
exports.makeFetchAnimesByGenreUseCase = makeFetchAnimesByGenreUseCase;
