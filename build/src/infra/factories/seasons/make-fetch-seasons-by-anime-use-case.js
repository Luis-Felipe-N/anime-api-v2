"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFetchSeasonsByAnimeUseCase = void 0;
const prisma_seasons_repository_1 = require("../../database/repositories/prisma-seasons-repository");
const fetch_seasons_by_anime_1 = require("@/domain/application/use-cases/fetch-seasons-by-anime");
const prisma_animes_repository_1 = require("@/infra/database/repositories/prisma-animes-repository");
const prisma_episodes_repository_1 = require("@/infra/database/repositories/prisma-episodes-repository");
const prisma_genres_repository_1 = require("@/infra/database/repositories/prisma-genres-repository");
function makeFetchSeasonsByAnimeUseCase() {
    const episodesRepository = new prisma_episodes_repository_1.PrismaEpisodesRepository();
    const seasonsRepository = new prisma_seasons_repository_1.PrismaSeasonsRepository(episodesRepository);
    const genresRepository = new prisma_genres_repository_1.PrismaGenresRepository();
    const animesRepository = new prisma_animes_repository_1.PrismaAnimesRepository(seasonsRepository, genresRepository);
    const useCase = new fetch_seasons_by_anime_1.FetchSeasonsByAnimeUseCase(seasonsRepository, animesRepository);
    return useCase;
}
exports.makeFetchSeasonsByAnimeUseCase = makeFetchSeasonsByAnimeUseCase;
