"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSeasonUseCase = void 0;
const unique_entity_id_1 = require("@/core/entities/unique-entity-id");
const episode_list_1 = require("@/domain/enterprise/entities/episode-list");
const season_1 = require("@/domain/enterprise/entities/season");
const make_episode_1 = require("./make-episode");
function makeSeasonUseCase(data) {
    const season = season_1.Season.create({
        animeId: new unique_entity_id_1.UniqueEntityId(), // WILL BE SUBSCRIPT
        title: data.title,
        episodes: new episode_list_1.EpisodeList(data.episodes.map(make_episode_1.makeEpisodeUseCase)),
    });
    return season;
}
exports.makeSeasonUseCase = makeSeasonUseCase;
