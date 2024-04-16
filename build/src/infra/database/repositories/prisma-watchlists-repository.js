"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaWatchlistsRepository = void 0;
const prisma_1 = require("../prisma/prisma");
const watchlist_1 = require("@/domain/enterprise/entities/watchlist");
const prisma_watchlist_mapper_1 = require("../mapper/prisma-watchlist-mapper");
const unique_entity_id_1 = require("@/core/entities/unique-entity-id");
const prisma_watchlist_detail_mapper_1 = require("../mapper/prisma-watchlist-detail-mapper");
class PrismaWatchlistsRepository {
    async findById(id) {
        const watchlist = await prisma_1.prisma.watchlist.findUnique({
            where: {
                id,
            },
        });
        if (!watchlist) {
            return null;
        }
        return prisma_watchlist_mapper_1.PrismaWatchlistMapper.toDomain(watchlist);
    }
    async create(watchlist) {
        const data = prisma_watchlist_mapper_1.PrismaWatchlistMapper.toPrisma(watchlist);
        const watchlistPrisma = await prisma_1.prisma.watchlist.create({
            data: {
                ...data,
                animes: data.animes
            },
            include: {
                animes: true,
            },
        });
        return prisma_watchlist_detail_mapper_1.PrismaWatchlistDetailMapper.toDomain(watchlistPrisma);
    }
    async findByUserId(userId) {
        const watchlist = await prisma_1.prisma.watchlist.findUnique({
            where: {
                userId,
            },
            include: { animes: true },
        });
        if (!watchlist) {
            return null;
        }
        return prisma_watchlist_detail_mapper_1.PrismaWatchlistDetailMapper.toDomain(watchlist);
    }
    async findByUserIdOrCreate(userId) {
        const watchlist = await prisma_1.prisma.watchlist.findUnique({
            where: {
                userId,
            },
            include: {
                animes: true,
            },
        });
        if (!watchlist) {
            const watchlist = await this.create(watchlist_1.Watchlist.create({
                userId: new unique_entity_id_1.UniqueEntityId(userId),
            }));
            return watchlist;
        }
        return prisma_watchlist_detail_mapper_1.PrismaWatchlistDetailMapper.toDomain(watchlist);
    }
    async save(watchlist) {
        const data = prisma_watchlist_mapper_1.PrismaWatchlistMapper.toPrisma(watchlist);
        console.log(data, data.animes);
        const watchlistPrisma = await prisma_1.prisma.watchlist.update({
            where: {
                id: data.id,
            },
            include: {
                animes: true,
            },
            data: {
                ...data,
                animes: data.animes
            },
        });
        return prisma_watchlist_mapper_1.PrismaWatchlistMapper.toDomain(watchlistPrisma);
    }
}
exports.PrismaWatchlistsRepository = PrismaWatchlistsRepository;
