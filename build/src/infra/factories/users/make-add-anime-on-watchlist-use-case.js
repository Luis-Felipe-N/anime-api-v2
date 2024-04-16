"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAddAnimeOnWatchlistUseCase = void 0;
const add_anime_on_watchlist_1 = require("@/domain/application/use-cases/add-anime-on-watchlist");
const prisma_animes_repository_1 = require("@/infra/database/repositories/prisma-animes-repository");
const prisma_episodes_repository_1 = require("@/infra/database/repositories/prisma-episodes-repository");
const prisma_genres_repository_1 = require("@/infra/database/repositories/prisma-genres-repository");
const prisma_seasons_repository_1 = require("@/infra/database/repositories/prisma-seasons-repository");
const prisma_users_repository_1 = require("@/infra/database/repositories/prisma-users-repository");
const prisma_watchlists_repository_1 = require("@/infra/database/repositories/prisma-watchlists-repository");
function makeAddAnimeOnWatchlistUseCase() {
    const episodesRepository = new prisma_episodes_repository_1.PrismaEpisodesRepository();
    const seasonsRepository = new prisma_seasons_repository_1.PrismaSeasonsRepository(episodesRepository);
    const genresRepository = new prisma_genres_repository_1.PrismaGenresRepository();
    const animesRepository = new prisma_animes_repository_1.PrismaAnimesRepository(seasonsRepository, genresRepository);
    const watchlistsRepository = new prisma_watchlists_repository_1.PrismaWatchlistsRepository();
    const usersRepository = new prisma_users_repository_1.PrismaUsersRepository();
    const useCase = new add_anime_on_watchlist_1.AddAnimeOnWatchlistUseCase(usersRepository, watchlistsRepository, animesRepository);
    return useCase;
}
exports.makeAddAnimeOnWatchlistUseCase = makeAddAnimeOnWatchlistUseCase;
