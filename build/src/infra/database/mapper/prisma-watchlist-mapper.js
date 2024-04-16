"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaWatchlistMapper = void 0;
const unique_entity_id_1 = require("@/core/entities/unique-entity-id");
const watchlist_1 = require("@/domain/enterprise/entities/watchlist");
class PrismaWatchlistMapper {
    static toDomain(raw) {
        return watchlist_1.Watchlist.create({
            userId: new unique_entity_id_1.UniqueEntityId(raw.userId),
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        }, new unique_entity_id_1.UniqueEntityId(raw.id));
    }
    static toPrisma(raw) {
        return {
            id: raw.id.toString(),
            userId: raw.userId.toString(),
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        };
    }
}
exports.PrismaWatchlistMapper = PrismaWatchlistMapper;
