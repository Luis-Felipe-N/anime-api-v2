"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryWatchlistsRepository = void 0;
const unique_entity_id_1 = require("@/core/entities/unique-entity-id");
const watchlist_1 = require("@/domain/enterprise/entities/watchlist");
class InMemoryWatchlistsRepository {
    constructor() {
        this.items = [];
    }
    async create(watchlist) {
        this.items.push(watchlist);
        return watchlist;
    }
    async save(watchlist) {
        const watchlistIndex = this.items.findIndex((item) => item.id === watchlist.id);
        this.items[watchlistIndex] = watchlist;
        return watchlist;
    }
    async findById(id) {
        const watchlistMemory = this.items.find((watchlist) => id === watchlist.id.toString());
        if (!watchlistMemory) {
            return null;
        }
        return watchlistMemory;
    }
    async findByUserId(userId) {
        const watchlistMemory = this.items.find((watchlist) => userId === watchlist.userId.toString());
        if (!watchlistMemory) {
            return null;
        }
        return watchlistMemory;
    }
    async findByUserIdOrCreate(userId) {
        const watchlistMemory = this.items.find((watchlist) => userId === watchlist.userId.toString());
        if (!watchlistMemory) {
            const watchlist = await this.create(watchlist_1.Watchlist.create({
                userId: new unique_entity_id_1.UniqueEntityId(userId),
            }));
            return watchlist;
        }
        return watchlistMemory;
    }
}
exports.InMemoryWatchlistsRepository = InMemoryWatchlistsRepository;
