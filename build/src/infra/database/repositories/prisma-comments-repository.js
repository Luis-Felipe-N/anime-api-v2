"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaCommentsRepository = void 0;
const prisma_1 = require("../prisma/prisma");
const prisma_comment_mapper_1 = require("../mapper/prisma-comment-mapper");
class PrismaCommentsRepository {
    // constructor(private seasonsRepository: SeasonsRepository) {}
    async create(comment) {
        const data = prisma_comment_mapper_1.PrismaCommentMapper.toPrisma(comment);
        await prisma_1.prisma.comment.create({
            data,
        });
    }
    async fetchCommentsByEpisode(episodeId, params) {
        const comments = await prisma_1.prisma.comment.findMany({
            where: {
                episodeId,
            },
            skip: (params.page - 1) * 20,
            take: 20,
        });
        return comments.map(prisma_comment_mapper_1.PrismaCommentMapper.toDomain);
    }
    async findById(id) {
        const comment = await prisma_1.prisma.comment.findUnique({
            where: {
                id,
            },
        });
        if (!comment)
            return null;
        return prisma_comment_mapper_1.PrismaCommentMapper.toDomain(comment);
    }
    async delete(comment) {
        const data = prisma_comment_mapper_1.PrismaCommentMapper.toPrisma(comment);
        await prisma_1.prisma.comment.delete({
            where: {
                id: data.id,
            },
        });
    }
}
exports.PrismaCommentsRepository = PrismaCommentsRepository;
