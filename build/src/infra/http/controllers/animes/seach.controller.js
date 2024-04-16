"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = void 0;
const either_1 = require("@/core/either");
const make_search_anime_use_case_1 = require("@/infra/factories/animes/make-search-anime-use-case");
const zod_1 = require("zod");
const anime_presenters_1 = require("../../presenters/anime-presenters");
async function search(request, reply) {
    const searchAnimeQuerySchema = zod_1.z.object({
        keyword: zod_1.z.string(),
        page: zod_1.z
            .string()
            .transform((state) => Number(state))
            .default('1'),
    });
    const { keyword, page } = searchAnimeQuerySchema.parse(request.query);
    const useCase = (0, make_search_anime_use_case_1.makeSearchAnimeUseCase)();
    const result = await useCase.execute({
        keyword,
        page,
    });
    if (result.isFailure()) {
        return (0, either_1.failure)(new Error(''));
    }
    return reply.status(200).send({
        animes: result.value.animes.map(anime_presenters_1.AnimePresenter.toHTTP),
    });
}
exports.search = search;
