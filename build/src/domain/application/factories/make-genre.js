"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGenreUseCase = void 0;
const unique_entity_id_1 = require("@/core/entities/unique-entity-id");
const genre_1 = require("@/domain/enterprise/entities/genre");
function makeGenreUseCase(data) {
    const genre = genre_1.Genre.create({
        animeId: new unique_entity_id_1.UniqueEntityId(), // WILL BE SUBSCRIPT
        title: data.title,
    });
    return genre;
}
exports.makeGenreUseCase = makeGenreUseCase;
