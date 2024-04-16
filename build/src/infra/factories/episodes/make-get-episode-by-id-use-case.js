"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetEpisodeByIdUseCase = void 0;
const get_episode_by_id_1 = require("@/domain/application/use-cases/get-episode-by-id");
const prisma_episodes_repository_1 = require("@/infra/database/repositories/prisma-episodes-repository");
function makeGetEpisodeByIdUseCase() {
    const episodesRepository = new prisma_episodes_repository_1.PrismaEpisodesRepository();
    const useCase = new get_episode_by_id_1.GetEpisodeByIdUseCase(episodesRepository);
    return useCase;
}
exports.makeGetEpisodeByIdUseCase = makeGetEpisodeByIdUseCase;
