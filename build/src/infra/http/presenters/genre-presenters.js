"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenrePresenter = void 0;
class GenrePresenter {
    static toHTTP(genre) {
        return {
            id: genre.id.toString(),
            title: genre.title,
            slug: genre.slug.value,
            animeId: genre.animeId.toString(),
        };
    }
}
exports.GenrePresenter = GenrePresenter;
