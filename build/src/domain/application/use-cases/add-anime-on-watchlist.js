"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAnimeOnWatchlistUseCase = void 0;
const either_1 = require("@/core/either");
const resource_not_found_error_1 = require("./errors/resource-not-found-error");
const unique_entity_id_1 = require("@/core/entities/unique-entity-id");
const watchlist_anime_list_1 = require("@/domain/enterprise/entities/watchlist-anime-list");
const watchlist_anime_1 = require("@/domain/enterprise/entities/watchlist-anime");
class AddAnimeOnWatchlistUseCase {
    constructor(usersRepository, watchlistRepository) {
        this.usersRepository = usersRepository;
        this.watchlistRepository = watchlistRepository;
    }
    async execute({ userId, animesIds, }) {
        const user = this.usersRepository.findById(userId);
        if (!user) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        const watchlist = await this.watchlistRepository.findByUserIdOrCreate(userId);
        const watchlistAnimes = animesIds.map((animeId) => {
            return watchlist_anime_1.WatchlistAnime.create({
                watchlistId: watchlist.id,
                animeId: new unique_entity_id_1.UniqueEntityId(animeId),
            });
        });
        watchlist.animes = new watchlist_anime_list_1.WatchlistAnimeList(watchlistAnimes);
        console.log(watchlist.animes);
        const watchlistSaved = await this.watchlistRepository.save(watchlist);
        return (0, either_1.success)({ watchlist: watchlistSaved });
    }
}
exports.AddAnimeOnWatchlistUseCase = AddAnimeOnWatchlistUseCase;
