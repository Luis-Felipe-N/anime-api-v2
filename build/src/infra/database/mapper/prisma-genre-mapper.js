"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaGenreMapper = void 0;
const unique_entity_id_1 = require("@/core/entities/unique-entity-id");
const slug_1 = require("@/core/values-objects/slug");
const genre_1 = require("@/domain/enterprise/entities/genre");
class PrismaGenreMapper {
    static toDomain(raw) {
        return genre_1.Genre.create({
            animeId: new unique_entity_id_1.UniqueEntityId(raw.animeId),
            title: raw.title,
            slug: slug_1.Slug.create(raw.slug),
        }, new unique_entity_id_1.UniqueEntityId(raw.id));
    }
    static toPrisma(raw) {
        return {
            id: raw.id.toString(),
            title: raw.title,
            slug: raw.slug.value,
            animeId: raw.animeId.toString(),
        };
    }
    static toPrismaMany(raws) {
        return raws.map((raw) => ({
            id: raw.id.toString(),
            animeId: raw.animeId.toString(),
            title: raw.title,
            slug: raw.slug.value,
        }));
    }
    static toPrismaUpdateMany(genres) {
        const genresIds = genres.map((genre) => {
            return genre.id.toString();
        });
        return {
            where: {
                id: {
                    in: genresIds,
                },
            },
            data: {
                animeId: genres[0].animeId.toString(),
            },
        };
    }
}
exports.PrismaGenreMapper = PrismaGenreMapper;
