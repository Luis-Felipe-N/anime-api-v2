"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchByGenre = void 0;
const zod_1 = require("zod");
const anime_presenters_1 = require("../../presenters/anime-presenters");
const make_fetch_animes_by_genre_use_case_1 = require("@/infra/factories/animes/make-fetch-animes-by-genre-use-case");
async function fetchByGenre(request, reply) {
    const fetchAnimesByGenreParamsSchema = zod_1.z.object({
        slug: zod_1.z.string(),
    });
    const fetchAnimesByGenreQuerySchema = zod_1.z.object({
        page: zod_1.z
            .string()
            .transform((state) => Number(state))
            .default('1'),
    });
    const { slug } = fetchAnimesByGenreParamsSchema.parse(request.params);
    const { page } = fetchAnimesByGenreQuerySchema.parse(request.query);
    const useCase = (0, make_fetch_animes_by_genre_use_case_1.makeFetchAnimesByGenreUseCase)();
    const result = await useCase.execute({ genreSlug: slug, page });
    if (result.isSuccess()) {
        return reply
            .status(200)
            .send({ animes: result.value.animes.map(anime_presenters_1.AnimePresenter.toHTTP) });
    }
}
exports.fetchByGenre = fetchByGenre;
