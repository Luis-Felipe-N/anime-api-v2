"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaEpisodesRepository = void 0;
const prisma_1 = require("../prisma/prisma");
const prisma_episode_mapper_1 = require("../mapper/prisma-episode-mapper");
const prisma_episode_detail_mapper_1 = require("../mapper/prisma-episode-detail-mapper");
class PrismaEpisodesRepository {
    constructor() { }
    async create(episode) {
        const data = prisma_episode_mapper_1.PrismaEpisodeMapper.toPrisma(episode);
        await prisma_1.prisma.episode.create({
            data,
        });
    }
    async createFromScrapper(episode, seasonId) {
        const { id, ...data } = prisma_episode_mapper_1.PrismaEpisodeMapper.toPrismaScrapper(episode, seasonId);
        await prisma_1.prisma.episode.upsert({
            where: {
                slug: data.slug,
            },
            create: {
                id,
                ...data,
            },
            update: {
                ...data,
            },
        });
    }
    async createMany(episodes) {
        const data = prisma_episode_mapper_1.PrismaEpisodeMapper.toPrismaMany(episodes);
        await prisma_1.prisma.episode.createMany({
            data,
        });
    }
    async createManyFromScrapper(episodes, seasonId) {
        episodes.map((episode) => this.createFromScrapper(episode, seasonId));
    }
    async findManyBySeason(seasonId, params) {
        const episodes = await prisma_1.prisma.episode.findMany({
            where: {
                seasonId,
            },
            include: {
                season: {
                    include: {
                        anime: {
                            include: { genres: true }
                        }
                    },
                },
            },
            orderBy: {
                index: 'asc',
            },
            skip: (params.page - 1) * 20,
            take: 20,
        });
        return episodes.map(prisma_episode_detail_mapper_1.PrismaEpisodeDetailsMapper.toDomain);
    }
    async findByIndex(seasonId, episodeIndex) {
        const episode = await prisma_1.prisma.episode.findFirst({
            where: {
                seasonId,
                index: episodeIndex,
            },
            include: {
                season: {
                    include: {
                        anime: {
                            include: { genres: true }
                        }
                    },
                },
            },
        });
        if (!episode)
            return null;
        return prisma_episode_detail_mapper_1.PrismaEpisodeDetailsMapper.toDomain(episode);
    }
    async findBySlug(slug) {
        const episode = await prisma_1.prisma.episode.findFirst({
            where: {
                slug,
            },
        });
        if (!episode)
            return null;
        return prisma_episode_mapper_1.PrismaEpisodeMapper.toDomain(episode);
    }
    async findById(id) {
        const episode = await prisma_1.prisma.episode.findUnique({
            where: {
                id,
            },
            include: {
                season: {
                    include: {
                        anime: {
                            include: { genres: true }
                        }
                    },
                },
            },
        });
        if (!episode)
            return null;
        return prisma_episode_detail_mapper_1.PrismaEpisodeDetailsMapper.toDomain(episode);
    }
    async delete(episode) {
        const data = prisma_episode_mapper_1.PrismaEpisodeMapper.toPrisma(episode);
        await prisma_1.prisma.episode.delete({
            where: {
                id: data.id,
            },
        });
    }
}
exports.PrismaEpisodesRepository = PrismaEpisodesRepository;
