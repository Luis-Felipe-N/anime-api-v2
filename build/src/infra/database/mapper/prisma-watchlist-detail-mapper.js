"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaWatchlistDetailMapper = void 0;
const unique_entity_id_1 = require("@/core/entities/unique-entity-id");
const anime_list_1 = require("@/domain/enterprise/entities/anime-list");
const watchlist_1 = require("@/domain/enterprise/entities/watchlist");
const prisma_anime_mapper_1 = require("./prisma-anime-mapper");
class PrismaWatchlistDetailMapper {
    static toDomain(raw) {
        return watchlist_1.Watchlist.create({
            userId: new unique_entity_id_1.UniqueEntityId(raw.userId),
            animes: new anime_list_1.AnimeList(raw.animes.map(prisma_anime_mapper_1.PrismaAnimeMapper.toDomain)),
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        }, new unique_entity_id_1.UniqueEntityId(raw.id));
    }
}
exports.PrismaWatchlistDetailMapper = PrismaWatchlistDetailMapper;
