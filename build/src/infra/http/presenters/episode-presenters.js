"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EpisodePresenter = void 0;
const season_presenters_1 = require("./season-presenters");
class EpisodePresenter {
    static toHTTP(episode) {
        return {
            id: episode.id.toString(),
            title: episode.title,
            slug: episode.slug.value,
            description: episode.description,
            cover: episode.cover,
            createdAt: episode.createdAt,
            duration: episode.duration,
            index: episode.index,
            isNew: episode.isNew,
            type: episode.type,
            video: episode.video,
            seasonId: episode.seasonId.toString(),
            season: episode.season && season_presenters_1.SeasonPresenter.toHTTP(episode.season),
        };
    }
}
exports.EpisodePresenter = EpisodePresenter;
