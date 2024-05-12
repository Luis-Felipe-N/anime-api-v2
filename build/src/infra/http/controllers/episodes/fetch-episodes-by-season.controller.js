"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchEpisodesBySeason = void 0;
const make_fetch_episode_by_season_use_case_1 = require("@/infra/factories/episodes/make-fetch-episode-by-season-use-case");
const zod_1 = require("zod");
const episode_presenters_1 = require("../../presenters/episode-presenters");
async function fetchEpisodesBySeason(request, reply) {
    const fetchEpisodesBySeasonParamsSchema = zod_1.z.object({
        seasonId: zod_1.z.string(),
    });
    const fetchEpisodesBySeasonQueryShema = zod_1.z.object({
        page: zod_1.z.number().default(1),
    });
    const { seasonId } = fetchEpisodesBySeasonParamsSchema.parse(request.params);
    const { page } = fetchEpisodesBySeasonQueryShema.parse(request.query);
    const useCase = (0, make_fetch_episode_by_season_use_case_1.makeFetchEpisodeBySeasonUseCase)();
    const result = await useCase.execute({
        seasonId,
        page,
    });
    if (result.isSuccess()) {
        return reply
            .status(200)
            .send({ episodes: result.value.episodes.map(episode_presenters_1.EpisodePresenter.toHTTP) });
    }
}
exports.fetchEpisodesBySeason = fetchEpisodesBySeason;
