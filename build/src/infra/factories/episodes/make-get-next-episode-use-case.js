"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetNextEpisodeUseCase = void 0;
const get_next_episode_1 = require("@/domain/application/use-cases/get-next-episode");
const prisma_animes_repository_1 = require("@/infra/database/repositories/prisma-animes-repository");
const prisma_episodes_repository_1 = require("@/infra/database/repositories/prisma-episodes-repository");
const prisma_genres_repository_1 = require("@/infra/database/repositories/prisma-genres-repository");
const prisma_seasons_repository_1 = require("@/infra/database/repositories/prisma-seasons-repository");
function makeGetNextEpisodeUseCase() {
    const episodesRepository = new prisma_episodes_repository_1.PrismaEpisodesRepository();
    const seasonsRepository = new prisma_seasons_repository_1.PrismaSeasonsRepository(episodesRepository);
    const genresRepository = new prisma_genres_repository_1.PrismaGenresRepository();
    const animesRepository = new prisma_animes_repository_1.PrismaAnimesRepository(seasonsRepository, genresRepository);
    const useCase = new get_next_episode_1.GetNextEpisodeUseCase(episodesRepository, seasonsRepository, animesRepository);
    return useCase;
}
exports.makeGetNextEpisodeUseCase = makeGetNextEpisodeUseCase;
