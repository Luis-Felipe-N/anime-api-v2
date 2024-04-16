"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.popular = void 0;
const anime_presenters_1 = require("../../presenters/anime-presenters");
const make_fetch_animes_by_genre_use_case_copy_1 = require("@/infra/factories/animes/make-fetch-animes-by-genre-use-case copy");
const either_1 = require("@/core/either");
async function popular(request, reply) {
    const useCase = (0, make_fetch_animes_by_genre_use_case_copy_1.makeFetchPopularAnimesUseCase)();
    const result = await useCase.execute();
    if (result.isFailure()) {
        return (0, either_1.failure)(new Error());
    }
    return reply
        .status(200)
        .send({ animes: result.value.animes.map(anime_presenters_1.AnimePresenter.toHTTP) });
}
exports.popular = popular;
