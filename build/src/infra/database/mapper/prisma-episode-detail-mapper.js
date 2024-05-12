"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaEpisodeDetailsMapper = void 0;
const unique_entity_id_1 = require("@/core/entities/unique-entity-id");
const slug_1 = require("@/core/values-objects/slug");
const episode_1 = require("@/domain/enterprise/entities/episode");
const prisma_season_detail_mapper_1 = require("./prisma-season-detail-mapper");
class PrismaEpisodeDetailsMapper {
    static toDomain(raw) {
        return episode_1.Episode.create({
            title: raw.title,
            seasonId: new unique_entity_id_1.UniqueEntityId(raw.seasonId),
            cover: raw.cover,
            description: raw.description,
            duration: raw.duration,
            index: raw.index,
            slug: slug_1.Slug.create(raw.slug),
            createdAt: raw.createdAt,
            type: raw.type,
            video: raw.video,
            season: raw.season ? prisma_season_detail_mapper_1.PrismaSeasonDetailsMapper.toDomainWithoutEpisodes(raw.season) : null,
        }, new unique_entity_id_1.UniqueEntityId(raw.id));
    }
}
exports.PrismaEpisodeDetailsMapper = PrismaEpisodeDetailsMapper;
