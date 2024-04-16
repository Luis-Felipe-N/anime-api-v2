"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextEpisode = void 0;
const zod_1 = require("zod");
const episode_presenters_1 = require("../../presenters/episode-presenters");
const make_get_next_episode_use_case_1 = require("@/infra/factories/episodes/make-get-next-episode-use-case");
const either_1 = require("@/core/either");
async function getNextEpisode(request, reply) {
    const getNextEpisodeBodySchema = zod_1.z.object({
        seasonId: zod_1.z.string(),
        animeId: zod_1.z.string(),
        currentIndex: zod_1.z.number(),
    });
    const { seasonId, animeId, currentIndex } = getNextEpisodeBodySchema.parse(request.body);
    const useCase = (0, make_get_next_episode_use_case_1.makeGetNextEpisodeUseCase)();
    const result = await useCase.execute({
        seasonId,
        animeId,
        currentEpisodeIndex: currentIndex,
    });
    if (result.isFailure()) {
        return (0, either_1.failure)(new Error());
    }
    return reply
        .status(200)
        .send({ episode: episode_presenters_1.EpisodePresenter.toHTTP(result.value.episode) });
}
exports.getNextEpisode = getNextEpisode;
