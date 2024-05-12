"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Watchlist = void 0;
const entity_1 = require("@/core/entities/entity");
const watchlist_anime_list_1 = require("./watchlist-anime-list");
class Watchlist extends entity_1.Entity {
    get userId() {
        return this.props.userId;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get updatedAt() {
        return this.props.updatedAt;
    }
    set animes(animes) {
        this.props.animes = animes;
        this.touch();
    }
    touch() {
        this.props.updatedAt = new Date();
    }
    static create(props, id) {
        const watchlist = new Watchlist({
            ...props,
            createdAt: new Date(),
            animes: props.animes ?? new watchlist_anime_list_1.WatchlistAnimeList(),
        }, id);
        return watchlist;
    }
}
exports.Watchlist = Watchlist;
