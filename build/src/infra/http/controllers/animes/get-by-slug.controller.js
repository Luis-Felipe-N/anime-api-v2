"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBySlug = void 0;
const make_get_anime_use_case_1 = require("@/infra/factories/animes/make-get-anime-use-case");
const zod_1 = require("zod");
const anime_presenters_1 = require("../../presenters/anime-presenters");
async function getBySlug(request, reply) {
    const getBySlugParamsSchema = zod_1.z.object({
        slug: zod_1.z.string(),
    });
    const { slug } = getBySlugParamsSchema.parse(request.params);
    const useCase = (0, make_get_anime_use_case_1.makeGetAnimeBySlugUseCase)();
    const result = await useCase.execute({
        slug,
    });
    if (result.isSuccess()) {
        return reply
            .status(200)
            .send({ anime: anime_presenters_1.AnimePresenter.toHTTP(result.value.anime) });
    }
}
exports.getBySlug = getBySlug;
