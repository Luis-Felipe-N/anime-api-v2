"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetSeasonByIdUseCase = void 0;
const get_season_by_id_1 = require("@/domain/application/use-cases/get-season-by-id");
const prisma_episodes_repository_1 = require("@/infra/database/repositories/prisma-episodes-repository");
const prisma_seasons_repository_1 = require("@/infra/database/repositories/prisma-seasons-repository");
function makeGetSeasonByIdUseCase() {
    const episodesRepository = new prisma_episodes_repository_1.PrismaEpisodesRepository();
    const seasonsRepository = new prisma_seasons_repository_1.PrismaSeasonsRepository(episodesRepository);
    const useCase = new get_season_by_id_1.GetSeasonByIdUseCase(seasonsRepository);
    return useCase;
}
exports.makeGetSeasonByIdUseCase = makeGetSeasonByIdUseCase;
