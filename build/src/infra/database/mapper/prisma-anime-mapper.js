"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaAnimeMapper = void 0;
const unique_entity_id_1 = require("@/core/entities/unique-entity-id");
const slug_1 = require("@/core/values-objects/slug");
const anime_1 = require("@/domain/enterprise/entities/anime");
class PrismaAnimeMapper {
    static toDomain(raw) {
        return anime_1.Anime.create({
            title: raw.title,
            description: raw.description,
            banner: raw.banner,
            cover: raw.cover,
            nsfw: raw.nsfw,
            trailerYtId: raw.trailerYtId,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
            slug: slug_1.Slug.create(raw.slug),
            rating: raw.rating,
        }, new unique_entity_id_1.UniqueEntityId(raw.id));
    }
    static toPrisma(raw) {
        return {
            id: raw.id.toString(),
            slug: raw.slug.value,
            title: raw.title,
            description: raw.description,
            banner: raw.banner,
            cover: raw.cover,
            nsfw: raw.nsfw,
            createdAt: raw.createdAt,
            rating: raw.rating,
            trailerYtId: raw.trailerYtId,
        };
    }
}
exports.PrismaAnimeMapper = PrismaAnimeMapper;
