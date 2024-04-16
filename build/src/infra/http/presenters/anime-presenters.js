"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimePresenter = void 0;
const genre_presenters_1 = require("./genre-presenters");
const season_presenters_1 = require("./season-presenters");
class AnimePresenter {
    static toHTTP(anime) {
        return {
            id: anime.id.toString(),
            title: anime.title,
            slug: anime.slug.value,
            description: anime.description,
            banner: anime.banner,
            cover: anime.cover,
            nsfw: anime.nsfw,
            genres: anime.genres.getItems().map(genre_presenters_1.GenrePresenter.toHTTP),
            seasons: anime.seasons.getItems().map(season_presenters_1.SeasonPresenter.toHTTP),
            trailerYtId: anime.trailerYtId,
            createdAt: anime.createdAt,
            updatedAt: anime.updatedAt,
            rating: anime.rating,
        };
    }
}
exports.AnimePresenter = AnimePresenter;
