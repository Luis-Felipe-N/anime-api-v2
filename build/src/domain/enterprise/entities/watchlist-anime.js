"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatchlistAnime = void 0;
const entity_1 = require("@/core/entities/entity");
class WatchlistAnime extends entity_1.Entity {
    get watchlistId() {
        return this.props.watchlistId;
    }
    get animeId() {
        return this.props.animeId;
    }
    static create(props, id) {
        const watchlistAnime = new WatchlistAnime(props, id);
        return watchlistAnime;
    }
}
exports.WatchlistAnime = WatchlistAnime;
