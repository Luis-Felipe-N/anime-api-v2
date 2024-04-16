"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCreateAnimeUseCase = void 0;
const create_anime_1 = require("@/domain/application/use-cases/create-anime");
const prisma_animes_repository_1 = require("../../database/repositories/prisma-animes-repository");
const prisma_seasons_repository_1 = require("../../database/repositories/prisma-seasons-repository");
const prisma_genres_repository_1 = require("../../database/repositories/prisma-genres-repository");
const prisma_episodes_repository_1 = require("@/infra/database/repositories/prisma-episodes-repository");
function makeCreateAnimeUseCase() {
    const episodesRepository = new prisma_episodes_repository_1.PrismaEpisodesRepository();
    const seasonsRepository = new prisma_seasons_repository_1.PrismaSeasonsRepository(episodesRepository);
    const genresRepository = new prisma_genres_repository_1.PrismaGenresRepository();
    const animesRepository = new prisma_animes_repository_1.PrismaAnimesRepository(seasonsRepository, genresRepository);
    const useCase = new create_anime_1.CreateAnimeUseCase(animesRepository);
    return useCase;
}
exports.makeCreateAnimeUseCase = makeCreateAnimeUseCase;
