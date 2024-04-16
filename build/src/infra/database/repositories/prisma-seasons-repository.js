"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaSeasonsRepository = void 0;
const prisma_season_mapper_1 = require("../mapper/prisma-season-mapper");
const prisma_1 = require("../prisma/prisma");
const prisma_season_detail_mapper_1 = require("../mapper/prisma-season-detail-mapper");
class PrismaSeasonsRepository {
    constructor(episodesRepository) {
        this.episodesRepository = episodesRepository;
    }
    async create(season) {
        const { id, ...data } = prisma_season_mapper_1.PrismaSeasonMapper.toPrisma(season);
        await prisma_1.prisma.season.upsert({
            where: {
                seasonIdentifier: {
                    animeId: season.animeId.toString(),
                    slug: data.slug,
                },
            },
            create: {
                id,
                ...data,
            },
            update: data,
        });
        this.episodesRepository.createMany(season.episodes.getItems());
    }
    async createFromScrapper(season, animeId) {
        const { id, ...data } = prisma_season_mapper_1.PrismaSeasonMapper.toPrisma(season);
        const seasonPrisma = await prisma_1.prisma.season.upsert({
            where: {
                seasonIdentifier: {
                    animeId,
                    slug: data.slug,
                },
            },
            create: {
                id,
                ...data,
                animeId,
            },
            update: {
                ...data,
                animeId,
            },
        });
        this.episodesRepository.createManyFromScrapper(season.episodes.getItems(), seasonPrisma.id);
    }
    async save(season) {
        const data = prisma_season_mapper_1.PrismaSeasonMapper.toPrisma(season);
        await prisma_1.prisma.season.update({
            where: {
                slug: data.slug,
            },
            data,
        });
    }
    async createMany(seasons) {
        seasons.map((season) => this.create(season));
    }
    async createManyFromScrapper(seasons, animeId) {
        seasons.map((season) => this.createFromScrapper(season, animeId));
    }
    async findBySlug(slug) {
        const season = await prisma_1.prisma.season.findUnique({
            where: {
                slug,
            },
        });
        if (!season)
            return null;
        return prisma_season_mapper_1.PrismaSeasonMapper.toDomain(season);
    }
    async findById(id) {
        const season = await prisma_1.prisma.season.findUnique({
            where: {
                id,
            },
            include: { episodes: true, anime: true },
        });
        if (!season)
            return null;
        return prisma_season_detail_mapper_1.PrismaSeasonDetailsMapper.toDomain(season);
    }
    async findManyByAnime(animeId) {
        const seasons = await prisma_1.prisma.season.findMany({
            where: { animeId }, orderBy: {
                slug: 'asc'
            }
        });
        return seasons.map(prisma_season_mapper_1.PrismaSeasonMapper.toDomain);
    }
    async delete(season) {
        const data = prisma_season_mapper_1.PrismaSeasonMapper.toPrisma(season);
        await prisma_1.prisma.season.delete({
            where: {
                id: data.id,
            },
        });
    }
}
exports.PrismaSeasonsRepository = PrismaSeasonsRepository;
