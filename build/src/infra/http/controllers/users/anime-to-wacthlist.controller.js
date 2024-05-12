"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.animeToWatchlist = void 0;
const bad_request_exception_1 = require("@/core/exception/bad-request.exception");
const make_add_anime_on_watchlist_use_case_1 = require("@/infra/factories/users/make-add-anime-on-watchlist-use-case");
const zod_1 = require("zod");
const watchlist_presenters_1 = require("../../presenters/watchlist-presenters");
async function animeToWatchlist(request, reply) {
    const animeToWatchListBodySchema = zod_1.z.object({
        animes: zod_1.z.array(zod_1.z.string().uuid()),
    });
    const { animes } = animeToWatchListBodySchema.parse(request.body);
    const useCase = (0, make_add_anime_on_watchlist_use_case_1.makeAddAnimeOnWatchlistUseCase)();
    const result = await useCase.execute({
        userId: request.user.sub,
        animesIds: animes,
    });
    if (result.isFailure()) {
        throw new bad_request_exception_1.BadRequestException();
    }
    return reply.status(200).send({
        user: watchlist_presenters_1.WatchlistPresenter.toHTTP(result.value.watchlist),
    });
}
exports.animeToWatchlist = animeToWatchlist;
