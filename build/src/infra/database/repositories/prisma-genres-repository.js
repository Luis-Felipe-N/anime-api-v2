"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaGenresRepository = void 0;
const prisma_1 = require("../prisma/prisma");
const prisma_genre_mapper_1 = require("../mapper/prisma-genre-mapper");
class PrismaGenresRepository {
    constructor() { }
    async create(genre) {
        const data = prisma_genre_mapper_1.PrismaGenreMapper.toPrisma(genre);
        await prisma_1.prisma.genre.create({
            data,
        });
    }
    async createFromScrapper(genre, animeId) {
        const { id, ...data } = prisma_genre_mapper_1.PrismaGenreMapper.toPrisma(genre);
        await prisma_1.prisma.genre.upsert({
            where: {
                genreIdentifier: {
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
        // await prisma.$queryRaw`
        //   INSERT INTO genres (id, title, slug, anime_id)
        //   VALUES (${id}, ${data.title}, ${data.slug}, ${animeId})
        //   ON CONFLICT (anime_id, slug)
        //   DO UPDATE
        //   SET title = EXCLUDED.title, slug = EXCLUDED.slug, anime_id = EXCLUDED.anime_id;
        //   `
    }
    async createMany(genres) {
        genres.map((genre) => this.create(genre));
    }
    async createManyFromScrapper(genres, animeId) {
        genres.map((genre) => this.createFromScrapper(genre, animeId));
    }
    async findBySlug(slug, animeId) {
        // const genre: PrismaGenre = await prisma.$queryRaw`
        //   SELECT *
        //   FROM genres
        //   WHERE anime_id = ${animeId} AND slug = ${slug};
        // `
        const genre = await prisma_1.prisma.genre.findUnique({
            where: {
                genreIdentifier: {
                    animeId,
                    slug,
                },
            },
        });
        if (!genre)
            return null;
        return prisma_genre_mapper_1.PrismaGenreMapper.toDomain(genre);
    }
    async findById(id) {
        const genre = await prisma_1.prisma.genre.findUnique({
            where: {
                id,
            },
        });
        if (!genre)
            return null;
        return prisma_genre_mapper_1.PrismaGenreMapper.toDomain(genre);
    }
    async delete(genre) {
        const data = prisma_genre_mapper_1.PrismaGenreMapper.toPrisma(genre);
        await prisma_1.prisma.genre.delete({
            where: {
                id: data.id,
            },
        });
    }
}
exports.PrismaGenresRepository = PrismaGenresRepository;
