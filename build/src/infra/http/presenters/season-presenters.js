"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeasonPresenter = void 0;
const episode_presenters_1 = require("./episode-presenters");
const anime_presenters_1 = require("./anime-presenters");
class SeasonPresenter {
    static toHTTP(season) {
        return {
            id: season.id.toString(),
            title: season.title,
            slug: season.slug.value,
            animeId: season.animeId.toString(),
            episodes: season.episodes.getItems().map(episode_presenters_1.EpisodePresenter.toHTTP),
            createdAt: season.createdAt,
            updatedAt: season.updatedAt,
            anime: season.anime && anime_presenters_1.AnimePresenter.toHTTP(season.anime),
        };
    }
}
exports.SeasonPresenter = SeasonPresenter;
