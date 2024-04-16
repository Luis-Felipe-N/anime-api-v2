"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeEpisodeUseCase = void 0;
const unique_entity_id_1 = require("@/core/entities/unique-entity-id");
const episode_1 = require("@/domain/enterprise/entities/episode");
function makeEpisodeUseCase(data) {
    const episode = episode_1.Episode.create({
        seasonId: new unique_entity_id_1.UniqueEntityId(), // WILL BE SUBSCRIPT
        title: data.title,
        cover: data.cover,
        description: data.description,
        duration: data.duration,
        index: data.index,
        slug: data.slug,
        createdAt: data.createdAt,
        type: data.type,
        video: data.video,
    });
    return episode;
}
exports.makeEpisodeUseCase = makeEpisodeUseCase;
