"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaSeasonMapper = void 0;
const unique_entity_id_1 = require("@/core/entities/unique-entity-id");
const slug_1 = require("@/core/values-objects/slug");
const season_1 = require("@/domain/enterprise/entities/season");
class PrismaSeasonMapper {
    static toDomain(raw) {
        return season_1.Season.create({
            title: raw.title,
            animeId: new unique_entity_id_1.UniqueEntityId(raw.animeId),
            slug: slug_1.Slug.create(raw.slug),
            updatedAt: raw.updatedAt,
            createdAt: raw.createdAt,
        }, new unique_entity_id_1.UniqueEntityId(raw.id));
    }
    static toPrisma(raw) {
        return {
            id: raw.id.toString(),
            slug: raw.slug.value,
            animeId: raw.animeId.toString(),
            title: raw.title,
            updatedAt: raw.updatedAt,
            createdAt: raw.createdAt,
        };
    }
    static toPrismaMany(raws) {
        return raws.map((raw) => ({
            id: raw.id.toString(),
            slug: raw.slug.value,
            animeId: raw.animeId.toString(),
            title: raw.title,
            updatedAt: raw.updatedAt,
            createdAt: raw.createdAt,
        }));
    }
    static toPrismaUpdateMany(seasons) {
        const seasonsIds = seasons.map((season) => {
            return season.id.toString();
        });
        return {
            where: {
                id: {
                    in: seasonsIds,
                },
            },
            data: {
                animeId: seasons[0].animeId.toString(),
            },
        };
    }
}
exports.PrismaSeasonMapper = PrismaSeasonMapper;
