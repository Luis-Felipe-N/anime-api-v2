"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaEpisodeMapper = void 0;
const unique_entity_id_1 = require("@/core/entities/unique-entity-id");
const slug_1 = require("@/core/values-objects/slug");
const episode_1 = require("@/domain/enterprise/entities/episode");
class PrismaEpisodeMapper {
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
        }, new unique_entity_id_1.UniqueEntityId(raw.id));
    }
    static toPrisma(raw) {
        return {
            id: raw.id.toString(),
            seasonId: raw.seasonId.toString(),
            title: raw.title,
            cover: raw.cover,
            description: raw.description,
            duration: raw.duration,
            index: raw.index,
            slug: raw.slug.value,
            createdAt: raw.createdAt,
            type: raw.type,
            video: raw.video,
        };
    }
    static toPrismaScrapper(raw, seasonId) {
        return {
            id: raw.id.toString(),
            seasonId,
            title: raw.title,
            cover: raw.cover,
            description: raw.description,
            duration: raw.duration,
            index: raw.index,
            slug: raw.slug.value,
            createdAt: raw.createdAt,
            type: raw.type,
            video: raw.video,
        };
    }
    static toPrismaMany(raws) {
        return raws.map((raw) => ({
            seasonId: raw.seasonId.toString(),
            id: raw.id.toString(),
            title: raw.title,
            cover: raw.cover,
            description: raw.description,
            duration: raw.duration,
            index: raw.index,
            slug: raw.slug.value,
            createdAt: raw.createdAt,
            type: raw.type,
            video: raw.video,
        }));
    }
    static toPrismaManyFromScrapper(raws, seasonId) {
        return raws.map((raw) => ({
            seasonId,
            id: raw.id.toString(),
            title: raw.title,
            cover: raw.cover,
            description: raw.description,
            duration: raw.duration,
            index: raw.index,
            slug: raw.slug.value,
            createdAt: raw.createdAt,
            type: raw.type,
            video: raw.video,
        }));
    }
}
exports.PrismaEpisodeMapper = PrismaEpisodeMapper;
