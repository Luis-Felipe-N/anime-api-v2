"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaWatchlistOnAnimesMapper = void 0;
const unique_entity_id_1 = require("@/core/entities/unique-entity-id");
const watchlist_anime_1 = require("@/domain/enterprise/entities/watchlist-anime");
class PrismaWatchlistOnAnimesMapper {
    static toDomain(raw) {
        if (!raw.watchlistId) {
            throw new Error('Invalid attachment type.');
        }
        return watchlist_anime_1.WatchlistAnime.create({
            animeId: new unique_entity_id_1.UniqueEntityId(raw.animeId),
            watchlistId: new unique_entity_id_1.UniqueEntityId(raw.watchlistId),
        }, new unique_entity_id_1.UniqueEntityId(raw.animeId));
    }
    static toPrismaUpdateMany(watchlistAnimes) {
        const watchlistAnimeIds = watchlistAnimes.map((watchlistAnime) => {
            return watchlistAnime.animeId.toString();
        });
        return {
            where: {
                id: {
                    in: watchlistAnimeIds,
                },
            },
            data: {
                watchlistId: watchlistAnimes[0].watchlistId.toString()
                // watchlist: attachments[0].questionId.toString(),
            },
        };
    }
}
exports.PrismaWatchlistOnAnimesMapper = PrismaWatchlistOnAnimesMapper;
