"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaWatchlistAnimesRepository = void 0;
const prisma_1 = require("../prisma/prisma");
class PrismaWatchlistAnimesRepository {
    async createMany(attachments) {
        if (attachments.length === 0) {
            return;
        }
        const data = PrismaQuestionAttachmentMapper.toPrismaUpdateMany(attachments);
        await prisma_1.prisma.watchlistOnAnimes.updateMany(data);
    }
    async deleteMany(attachments) {
        if (attachments.length === 0) {
            return;
        }
        const attachmentIds = attachments.map((attachment) => {
            return attachment.id.toString();
        });
        await this.prisma.attachment.deleteMany({
            where: {
                id: {
                    in: attachmentIds,
                },
            },
        });
    }
    async deleteManyByQuestionId(questionId) {
        await this.prisma.attachment.deleteMany({
            where: {
                questionId,
            },
        });
    }
}
exports.PrismaWatchlistAnimesRepository = PrismaWatchlistAnimesRepository;
