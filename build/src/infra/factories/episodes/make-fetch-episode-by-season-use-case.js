"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFetchEpisodeBySeasonUseCase = void 0;
const prisma_seasons_repository_1 = require("../../database/repositories/prisma-seasons-repository");
const fetch_episodes_by_season_1 = require("@/domain/application/use-cases/fetch-episodes-by-season");
const prisma_episodes_repository_1 = require("@/infra/database/repositories/prisma-episodes-repository");
function makeFetchEpisodeBySeasonUseCase() {
    const episodesRepository = new prisma_episodes_repository_1.PrismaEpisodesRepository();
    const seasonsRepository = new prisma_seasons_repository_1.PrismaSeasonsRepository(episodesRepository);
    const useCase = new fetch_episodes_by_season_1.FetchEpisodeBySeasonUseCase(episodesRepository, seasonsRepository);
    return useCase;
}
exports.makeFetchEpisodeBySeasonUseCase = makeFetchEpisodeBySeasonUseCase;
