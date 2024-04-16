"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaAnimeDetailsMapper = void 0;
const unique_entity_id_1 = require("@/core/entities/unique-entity-id");
const slug_1 = require("@/core/values-objects/slug");
const anime_1 = require("@/domain/enterprise/entities/anime");
const prisma_season_mapper_1 = require("./prisma-season-mapper");
const season_list_1 = require("@/domain/enterprise/entities/season-list");
const genre_list_1 = require("@/domain/enterprise/entities/genre-list");
const prisma_genre_mapper_1 = require("./prisma-genre-mapper");
class PrismaAnimeDetailsMapper {
    static toDomain(raw) {
        return anime_1.Anime.create({
            title: raw.title,
            description: raw.description,
            banner: raw.banner,
            cover: raw.cover,
            nsfw: raw.nsfw,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
            seasons: new season_list_1.SeasonList(raw.seasons.map(prisma_season_mapper_1.PrismaSeasonMapper.toDomain)),
            genres: new genre_list_1.GenreList(raw.genres.map(prisma_genre_mapper_1.PrismaGenreMapper.toDomain)),
            trailerYtId: raw.trailerYtId,
            slug: slug_1.Slug.create(raw.slug),
            rating: raw.rating,
        }, new unique_entity_id_1.UniqueEntityId(raw.id));
    }
    static toDomainWithoutSeasons(raw) {
        return anime_1.Anime.create({
            title: raw.title,
            description: raw.description,
            banner: raw.banner,
            cover: raw.cover,
            nsfw: raw.nsfw,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
            genres: new genre_list_1.GenreList(raw.genres.map(prisma_genre_mapper_1.PrismaGenreMapper.toDomain)),
            trailerYtId: raw.trailerYtId,
            slug: slug_1.Slug.create(raw.slug),
            rating: raw.rating,
        }, new unique_entity_id_1.UniqueEntityId(raw.id));
    }
}
exports.PrismaAnimeDetailsMapper = PrismaAnimeDetailsMapper;
