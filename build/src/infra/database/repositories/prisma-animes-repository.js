"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaAnimesRepository = void 0;
const prisma_1 = require("../prisma/prisma");
const prisma_anime_mapper_1 = require("../mapper/prisma-anime-mapper");
const prisma_anime_detail_mapper_1 = require("../mapper/prisma-anime-detail-mapper");
const normalize_1 = require("@/core/values-objects/normalize");
class PrismaAnimesRepository {
    constructor(seasonsRepository, genresRepository) {
        this.seasonsRepository = seasonsRepository;
        this.genresRepository = genresRepository;
    }
    async create(anime) {
        const { id, ...data } = prisma_anime_mapper_1.PrismaAnimeMapper.toPrisma(anime);
        await prisma_1.prisma.anime.upsert({
            where: {
                slug: data.slug,
            },
            create: {
                id,
                ...data,
            },
            update: data,
        });
        await this.seasonsRepository.createMany(anime.seasons.getItems());
        await this.genresRepository.createMany(anime.genres.getItems());
    }
    async createFromScrapper(anime) {
        const { id, ...data } = prisma_anime_mapper_1.PrismaAnimeMapper.toPrisma(anime);
        const animePrisma = await prisma_1.prisma.anime.upsert({
            where: {
                slug: data.slug,
            },
            create: {
                id,
                ...data,
            },
            update: data,
        });
        await this.seasonsRepository.createManyFromScrapper(anime.seasons.getItems(), animePrisma.id);
        await this.genresRepository.createManyFromScrapper(anime.genres.getItems(), animePrisma.id);
    }
    async save(anime) {
        const data = prisma_anime_mapper_1.PrismaAnimeMapper.toPrisma(anime);
        await prisma_1.prisma.anime.update({
            where: {
                slug: data.slug,
            },
            data,
        });
        await this.seasonsRepository.createMany(anime.seasons.getItems());
        await this.genresRepository.createMany(anime.genres.getItems());
    }
    async findBySlug(slug) {
        const anime = await prisma_1.prisma.anime.findUnique({
            where: {
                slug,
            },
            include: {
                seasons: true,
                genres: true,
            },
        });
        if (!anime)
            return null;
        return prisma_anime_detail_mapper_1.PrismaAnimeDetailsMapper.toDomain(anime);
    }
    async findById(id) {
        const anime = await prisma_1.prisma.anime.findUnique({
            where: {
                id,
            },
            include: {
                seasons: true,
                genres: true,
            },
        });
        if (!anime)
            return null;
        return prisma_anime_detail_mapper_1.PrismaAnimeDetailsMapper.toDomain(anime);
    }
    async findManyByGenre(genreSlug, params) {
        const animes = await prisma_1.prisma.anime.findMany({
            where: {
                AND: [
                    {
                        genres: {
                            some: {
                                slug: genreSlug,
                            },
                        },
                    },
                    {
                        NOT: {
                            genres: {
                                some: {
                                    slug: "sem-censura"
                                }
                            }
                        }
                    },
                    {
                        NOT: {
                            genres: {
                                some: {
                                    slug: "18"
                                }
                            }
                        }
                    },
                ]
            },
            include: {
                seasons: true,
                genres: true,
            },
            orderBy: {
                banner: {
                    sort: 'asc',
                },
            },
            skip: (params.page - 1) * 20,
            take: 20,
        });
        return animes.map(prisma_anime_detail_mapper_1.PrismaAnimeDetailsMapper.toDomain);
    }
    async delete(anime) {
        const data = prisma_anime_mapper_1.PrismaAnimeMapper.toPrisma(anime);
        await prisma_1.prisma.anime.delete({
            where: {
                id: data.id,
            },
        });
    }
    async findManyByKeyword(keyword, params) {
        await prisma_1.prisma.$queryRaw `
      DROP EXTENSION IF EXISTS unaccent;
    `;
        await prisma_1.prisma.$queryRaw `
      CREATE EXTENSION unaccent;
    `;
        const animes = await prisma_1.prisma.$queryRaw `        
        select * from animes 
        where unaccent(slug) LIKE ${`%${normalize_1.Normalize.normalizeText(keyword)}%`}
        offset ${(params.page - 1) * 20}
        limit ${20};`;
        return animes.map(prisma_anime_mapper_1.PrismaAnimeMapper.toDomain);
    }
    async findManyPopular() {
        const itemCount = await prisma_1.prisma.anime.count({
            where: {
                banner: {
                    startsWith: 'https://media.kitsu.io',
                },
                trailerYtId: {
                    not: null,
                },
            }
        });
        const skip = Math.max(0, Math.floor(Math.random() * itemCount) - 5);
        const animes = await prisma_1.prisma.anime.findMany({
            where: {
                banner: {
                    startsWith: 'https://media.kitsu.io',
                },
                trailerYtId: {
                    not: null,
                },
            },
            include: {
                seasons: true,
                genres: true,
            },
            orderBy: [
                // {
                //   rating: 'desc',
                // },
                {
                    banner: {
                        sort: 'asc',
                    },
                }
            ],
            skip: skip,
            take: 5,
        });
        return animes.map(prisma_anime_detail_mapper_1.PrismaAnimeDetailsMapper.toDomain);
    }
}
exports.PrismaAnimesRepository = PrismaAnimesRepository;
