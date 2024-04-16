"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchSeasonsByAnime = void 0;
const zod_1 = require("zod");
const make_fetch_seasons_by_anime_use_case_1 = require("@/infra/factories/seasons/make-fetch-seasons-by-anime-use-case");
const season_presenters_1 = require("../../presenters/season-presenters");
async function fetchSeasonsByAnime(request, reply) {
    const fetchSeasonsByAnimeParamsSchema = zod_1.z.object({
        animeId: zod_1.z.string(),
    });
    const { animeId } = fetchSeasonsByAnimeParamsSchema.parse(request.params);
    const useCase = (0, make_fetch_seasons_by_anime_use_case_1.makeFetchSeasonsByAnimeUseCase)();
    const result = await useCase.execute({
        animeId,
    });
    if (result.isSuccess()) {
        return reply
            .status(200)
            .send({ seasons: result.value.seasons.map(season_presenters_1.SeasonPresenter.toHTTP) });
    }
}
exports.fetchSeasonsByAnime = fetchSeasonsByAnime;
