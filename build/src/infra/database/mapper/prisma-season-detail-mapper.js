"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaSeasonDetailsMapper = void 0;
const unique_entity_id_1 = require("@/core/entities/unique-entity-id");
const slug_1 = require("@/core/values-objects/slug");
const episode_list_1 = require("@/domain/enterprise/entities/episode-list");
const season_1 = require("@/domain/enterprise/entities/season");
const prisma_episode_mapper_1 = require("./prisma-episode-mapper");
const prisma_anime_mapper_1 = require("./prisma-anime-mapper");
const prisma_anime_detail_mapper_1 = require("./prisma-anime-detail-mapper");
class PrismaSeasonDetailsMapper {
    static toDomain(raw) {
        return season_1.Season.create({
            title: raw.title,
            animeId: new unique_entity_id_1.UniqueEntityId(raw.animeId),
            slug: slug_1.Slug.create(raw.slug),
            episodes: new episode_list_1.EpisodeList(raw.episodes.map(prisma_episode_mapper_1.PrismaEpisodeMapper.toDomain)),
            updatedAt: raw.updatedAt,
            createdAt: raw.createdAt,
            anime: raw.anime && prisma_anime_mapper_1.PrismaAnimeMapper.toDomain(raw.anime),
        }, new unique_entity_id_1.UniqueEntityId(raw.id));
    }
    static toDomainWithoutEpisodes(raw) {
        return season_1.Season.create({
            title: raw.title,
            animeId: new unique_entity_id_1.UniqueEntityId(raw.animeId),
            slug: slug_1.Slug.create(raw.slug),
            updatedAt: raw.updatedAt,
            createdAt: raw.createdAt,
            anime: prisma_anime_detail_mapper_1.PrismaAnimeDetailsMapper.toDomainWithoutSeasons(raw.anime),
        }, new unique_entity_id_1.UniqueEntityId(raw.id));
    }
}
exports.PrismaSeasonDetailsMapper = PrismaSeasonDetailsMapper;
