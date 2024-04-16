"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
const entity_1 = require("@/core/entities/entity");
class Movie extends entity_1.Entity {
    static create(props, id) {
        const episode = new Movie({
            ...props,
            createdAt: new Date(),
        }, id);
        return episode;
    }
}
exports.Movie = Movie;
