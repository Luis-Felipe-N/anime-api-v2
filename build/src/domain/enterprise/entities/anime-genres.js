"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimeGenres = void 0;
const entity_1 = require("@/core/entities/entity");
class AnimeGenres extends entity_1.Entity {
    get animeId() {
        return this.props.animeId;
    }
    get genreId() {
        return this.props.animeId;
    }
    static create(props, id) {
        const genre = new AnimeGenres({
            ...props,
        }, id);
        return genre;
    }
}
exports.AnimeGenres = AnimeGenres;
